import { useContext } from 'react';
import { useChats } from '../hooks/useChats.js';
import { Link } from 'react-router';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import newChatIcon from '../assets/svgs/edit-square.svg';

const Chats = () => {
  const { chats } = useChats();
  const { username } = useContext(CurrentContext);

  return (
    <section className="h-full pt-4">
      <header className="flex justify-between pl-4 pr-6">
        <h2 className="text-3xl font-bold">{username}</h2>
        <button className="mt-auto">
          <img className="w-8" src={newChatIcon} alt="Create new chat icon" />
        </button>
      </header>
      <div className='px-2'>
        <input
          className="mt-3 h-9 w-full rounded-md border-2 border-b-black"
          type="text"
        />
      </div>
      <h3 className="mt-5 pl-3 text-xl font-bold">Conversations</h3>
      <ul className="mt-2 overflow-scroll">
        {chats &&
          chats.map((chat) => (
            <li key={chat.id} className="px-3 py-2">
              <Link
                className="flex items-center gap-2"
                to={`/chats/${chat.id}`}
              >
                <div className="size-14 rounded-full border-2 border-black"></div>
                <div className="flex flex-col">
                  <h4 className='font-medium text-lg' >{chat.name}</h4>
                  <p className="items-start justify-self-start">
                    {chat.latestMessage
                      ? chat.latestMessage.content
                      : 'start the conversation'}
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
