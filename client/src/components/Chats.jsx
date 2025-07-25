import { useContext } from 'react';
import { useChats } from '../hooks/useChats.js';
import { Link } from 'react-router';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const Chats = () => {
  const { chats } = useChats();
  const { username } = useContext(CurrentContext);

  return (
    <section className="h-full pl-2 pr-2 pt-4">
      <header className="flex justify-between pl-1 pr-1">
        <h2 className="text-3xl font-bold">{username}</h2>
        <button className="border-2 border-b-black">Create Chat</button>
      </header>
      <input
        className="mt-2 h-9 w-full rounded-md border-2 border-b-black"
        type="text"
      />
      <h3 className="mt-4 text-xl font-bold">Conversations</h3>
      <ul className="mt-2">
        {chats &&
          chats.map((chat) => (
            <li key={chat.id}>
              <Link
                className="flex items-center gap-2"
                to={`/chats/${chat.id}`}
              >
                <div className="size-9 rounded-full border-2 border-black"></div>
                <div>
                  <h4>{chat.name}</h4>
                  <p>
                    {chat.latestMessage
                      ? chat.latestMessage.content
                      : 'start the conversation!'}
                  </p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export { Chats };
