import { Fragment } from 'react';
import { usePublicChats } from '../hooks/usePublicChats.js';
import { ChatsLoading } from './ChatsLoading.jsx';
import { ChatsListItem } from './ChatsListItem.jsx';
import refreshIcon from '../assets/svgs/refresh.svg';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ChatsPublic = () => {
  const { publicChats, isLoading, refetch } = usePublicChats();
  return (
    <>
      <div className="mt-5 flex items-center justify-between">
        <h3 className="pl-4 text-xl font-extrabold">Public Rooms</h3>
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
          className="mr-5.5 rounded-2xl px-1 py-1 hover:bg-gray-200"
          onClick={refetch}
        >
          <img src={refreshIcon} alt="Refresh icon" />
        </motion.button>
      </div>
      <ul className="mt-2">
        {isLoading && <ChatsLoading items={1} />}
        {!isLoading &&
          publicChats.map((chat) => (
            <Fragment key={chat.id}>
              <ChatsListItem
                chatId={chat.id}
                chatName={chat.name}
                avatar={chat.avatar}
                latestMessage={chat.latestMessage}
              />
            </Fragment>
          ))}
      </ul>
    </>
  );
};

export { ChatsPublic };
