import { useChats } from '../hooks/useChats.js';
import { Link } from 'react-router';

const Chats = () => {
  const { chats } = useChats();

  return (
    <>
      <h2>Chats</h2>
      <ul>
        {chats &&
          chats.map((chat) => (
            <li key={chat.id}>
              <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export { Chats };
