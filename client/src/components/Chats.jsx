import { useContext } from 'react';
import { useChats } from '../hooks/useChats.js';
import { Link } from 'react-router';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { format } from 'date-fns';
import newChatIcon from '../assets/svgs/edit-square.svg';

const Chats = ({ openNewChatModal }) => {
  const { chats } = useChats();
  const { username } = useContext(CurrentContext);

  return (
    <div className="flex h-full flex-col pt-9">
      <header className="flex justify-between pl-5 pr-7">
        <h2 className="text-3xl font-bold">{username}</h2>
        <button className="mt-auto" onClick={openNewChatModal}>
          <img className="w-7" src={newChatIcon} alt="Create new chat icon" />
        </button>
      </header>
      <div className="px-3">
        <input
          className="mt-3 h-11 w-full rounded-lg bg-gray-200 pl-3"
          type="text"
          placeholder="Search"
        />
      </div>
      <h3 className="mt-5 pl-4 text-xl font-extrabold">Conversations</h3>
      <ul className="mt-2 h-auto flex-1 overflow-scroll">
        {chats &&
          chats.map((chat) => (
            <li key={chat.id} className="px-4 py-2">
              <Link className="flex gap-2" to={`/chats/${chat.id}`}>
                <div className="size-14 rounded-full bg-gray-200"></div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-medium">{chat.name}</h4>
                  <p className="text-align -mt-1 items-start justify-self-start">
                    {chat.latestMessage
                      ? `${chat.latestMessage.content} • ${format(new Date(chat.latestMessage.sendTime), 'MMM do • h:mmaaa')}`
                      : 'start the conversation'}
                  </p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { Chats };
