import { useContext, useState, Fragment } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { ChatsListItem } from './ChatsListItem.jsx';
import { ChatsLoading } from './ChatsLoading.jsx';
import newChatIcon from '../assets/svgs/edit-square.svg';
import refreshIcon from '../assets/svgs/refresh.svg';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const Chats = ({ chats, isLoading, openNewChatModal }) => {
  const { id, username } = useContext(CurrentContext);
  const { refetchChats } = useContext(ChatsContext);
  const [filter, setFilter] = useState('');

  // add chat names to null chat names
  const namedChats = chats
    ? chats.map((chat) => {
        if (!chat.name || chat.name == '') {
          chat.name =
            chat.users.length == 1
              ? username
              : chat.users
                  .filter((user) => user.id != id)
                  .map((user) => user.username)
                  .join(', ');
        }
        return chat;
      })
    : [];

  // search filter
  const normalizedFilter = filter.trim().toLowerCase();
  const filteredChats = namedChats
    ? namedChats.filter((chat) =>
        chat.name.toLowerCase().includes(normalizedFilter)
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
      <div className="mt-5 flex items-center justify-between">
        <h3 className="pl-4 text-xl font-extrabold">Conversations</h3>
        <motion.button
          initial={{ rotate: 0 }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
          }}
          whileHover={{
            rotate: 360,
            transition: {
              duration: 1,
              ease: 'easeInOut',
            },
          }}
          className="mr-6.5 rounded-2xl px-1 py-1 hover:bg-gray-200"
          onClick={refetchChats}
        >
          <img src={refreshIcon} alt="Refresh icon" />
        </motion.button>
      </div>
      <main className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full mt-2 flex-1 overflow-y-scroll">
        <ul className="scrollbar-track-black">
          {isLoading && <ChatsLoading />}
          {!isLoading &&
            filteredChats.map((chat) => (
              <Fragment key={chat.id}>
                <ChatsListItem
                  chatId={chat.id}
                  chatName={chat.name}
                  users={chat.users}
                  latestMessage={chat.latestMessage}
                />
              </Fragment>
            ))}
        </ul>
      </main>
    </div>
  );
};

export { Chats };
