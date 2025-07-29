import { useContext, useState, Fragment } from 'react';
import { useChats } from '../hooks/useChats.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { ChatsListItem } from './ChatsListItem.jsx';
import { ChatsLoading } from './ChatsLoading.jsx';
import newChatIcon from '../assets/svgs/edit-square.svg';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const Chats = ({ openNewChatModal }) => {
  const { chats, isLoading } = useChats();
  const { username } = useContext(CurrentContext);
  const [filter, setFilter] = useState('');

  // search filter
  const filteredChats = chats
    ? chats.filter((chat) =>
        chat.name.toLowerCase().includes(filter.trim().toLowerCase())
      )
    : [];

  return (
    <div className="flex h-full flex-col pt-9">
      <header className="flex justify-between pl-5 pr-7">
        <h2 className="text-3xl font-bold">{username}</h2>
        <button className="mt-auto" onClick={openNewChatModal}>
          <img className="w-7" src={newChatIcon} alt="Create new chat button" />
        </button>
      </header>
      <div className="px-3">
        <input
          className="mt-3 h-11 w-full rounded-lg bg-gray-200 pl-3"
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Search"
        />
      </div>
      <h3 className="mt-5 pl-4 text-xl font-extrabold">Conversations</h3>
      <motion.ul className="mt-2 h-auto flex-1 overflow-scroll">
        {isLoading && <ChatsLoading />}
        {!isLoading &&
          filteredChats &&
          filteredChats.map((chat) => (
            <Fragment key={chat.id}>
              <ChatsListItem
                chatId={chat.id}
                chatName={chat.name}
                latestMessage={chat.latestMessage}
              />
            </Fragment>
          ))}
      </motion.ul>
    </div>
  );
};

export { Chats };
