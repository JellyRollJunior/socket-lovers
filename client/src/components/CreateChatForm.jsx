import { useContext, useEffect, useState } from 'react';
import { useUsers } from '../hooks/useUsers.js';
import { createChat } from '../services/chatApi.js';
import { useTokenErrorHandler } from '../hooks/useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { useNavigate } from 'react-router';
import { LabelledInput } from './LabelledInput.jsx';

const CreateChatForm = () => {
  const navigate = useNavigate();
  const { users } = useUsers();
  const [selectedUsers, setSelectedUsers] = useState();
  const [name, setName] = useState('');
  const { handleTokenErrors } = useTokenErrorHandler();
  const { toastTemp } = useContext(ToastContext);

  useEffect(() => {
    // set first user as default
    if (users && users[0]) setSelectedUsers(users[0].id);
  }, [users]);

  const handleCreateChat = async (event) => {
    event.preventDefault();
    try {
      const data = await createChat(name, [selectedUsers]);
      // Move user to messages with new chat!
      setName('');
      navigate(`/chats/${data.id}`);
    } catch (error) {
      handleTokenErrors(error);
      toastTemp('Unable to create chat');
    }
  };

  return (
    <form className="min-w-2xs flex flex-col" onSubmit={handleCreateChat}>
      <h2 className="mb-1 self-center text-lg font-bold">New Conversation</h2>
      <hr className="mb-4" />
      <label className="mt-3 font-medium text-gray-500" htmlFor="user">
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
      <LabelledInput
        id="Conversation name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        minLength={1}
        maxLength={24}
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
