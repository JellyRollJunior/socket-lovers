import { useContext, useEffect, useState } from 'react';
import { useUsers } from '../hooks/useUsers.js';
import { createChat } from '../services/chatApi.js';
import { useTokenErrorHandler } from '../hooks/useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const CreateChatForm = () => {
  const { users } = useUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name, setName] = useState('');
  const { handleTokenErrors } = useTokenErrorHandler();
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    // set first user as default
    if (users && users[0]) setSelectedUsers(users[0].id);
  }, [users]);

  const handleCreateChat = async (event) => {
    event.preventDefault();
    try {
      const data = await createChat(name, [selectedUsers]);
      console.log(data);
      // Move user to messages with new chat!
      setName('');
    } catch (error) {
      handleTokenErrors(error);
      toast('Unable to create chat');
      console.log(error);
    }
  };

  return (
    <form className="min-w-2xs flex flex-col" onSubmit={handleCreateChat}>
      <h2 className="mb-1 self-center text-lg font-bold">New Conversation</h2>
      <hr className="mb-4" />
      <label className="mt-3 font-bold" htmlFor="user">
        Users
      </label>
      <select
        className="border-1 mt-1 h-8 rounded-md border-gray-400 bg-gray-200 pl-1.5"
        id="user"
        value={selectedUsers}
        onChange={(event) => setSelectedUsers(event.target.value)}
        required
      >
        {users &&
          users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
      </select>
      <label className="mt-5 font-bold" htmlFor="name">
        Conversation name
      </label>
      <input
        className="border-1 mt-1 h-8 rounded-md border-gray-400 bg-gray-200 pl-1.5"
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        minLength={1}
        required
      />
      <footer className="mt-8">
        <button className="w-full rounded-md bg-blue-400 px-5 py-1.5 text-white hover:bg-blue-500">
          Chat
        </button>
      </footer>
    </form>
  );
};

export { CreateChatForm };
