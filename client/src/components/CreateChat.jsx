import { useUsers } from "../hooks/useUsers.js";

const CreateChat = () => {
  const { users } = useUsers();
  console.log(users);

  const handleCreateChat = () => {}

  return (
    <>
      <h2>Create chat</h2>
      <form onSubmit={handleCreateChat}>
        <select>
          {users.map((user) => (
            <option key={user.id}>{user.username}</option>
          ))}
        </select>
        <button>Create</button>
      </form>
    </>
  );
};

export { CreateChat };
