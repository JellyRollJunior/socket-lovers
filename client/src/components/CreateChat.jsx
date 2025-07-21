import { useEffect, useState } from 'react';
import { useUsers } from '../hooks/useUsers.js';
import { createChat } from '../services/chatApi.js';
import { useTokenErrorHandler } from '../hooks/useTokenErrorHandler.js';

const CreateChat = () => {
  const { users } = useUsers();
  const [name, setName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { handleTokenErrors} = useTokenErrorHandler()

  useEffect(() => {
    // set first user as default
    if (users && users[0]) setSelectedUsers(users[0].id)
  }, [users])

  const handleCreateChat = async (event) => {
    event.preventDefault();
    try {
      const data = await createChat(name,[selectedUsers]);
      console.log(data);
      // Move user to messages with new chat!
      setName('');
    } catch (error) {
      handleTokenErrors(error);
      // Chat creation failure notification
      console.log(error)
    }
  };

  return (
    <>
      <h2>Create chat</h2>
      <form onSubmit={handleCreateChat}>
        <select
          value={selectedUsers}
          onChange={(event) => setSelectedUsers(event.target.value)}
          required
        >
          {users && users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <label htmlFor="name">Chat name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          minLength={1}
          required
        />
        <button>Create</button>
      </form>
    </>
  );
};

export { CreateChat };
