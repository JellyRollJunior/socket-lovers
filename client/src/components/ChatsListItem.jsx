import { useContext } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ChatsListItem = ({
  chatId,
  chatName,
  users,
  latestMessage,
  isLoading = false,
  delay = 0,
}) => {
  const { id } = useContext(CurrentContext);

  if (isLoading) {
    return (
      <motion.li
        style={{ backgroundColor: '#FFFFFF' }}
        className="flex gap-2 px-4 py-2"
        animate={{ backgroundColor: '#E5E7EB' }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 0.8,
          delay: delay,
          ease: 'easeInOut',
        }}
      >
        <div className="size-14 shrink-0 rounded-full bg-gray-200"></div>
        <div className="flex flex-col justify-center">
          <h4 className="w-18 h-4 rounded-sm bg-gray-200"></h4>
          <p className="w-30 mt-1 h-4 items-start justify-self-start rounded-sm bg-gray-200"></p>
        </div>
      </motion.li>
    );
  }

  const getChatAvatar = () => {
    let src = '';
    // use first avatar of chatter id != current id
    users.forEach((user) => {
      if (user.avatar && user.id != id) src = user.avatar;
    });
    // else if self chat, use avatar from current id
    if (users.length == 1 && users[0].avatar) src = users[0].avatar;
    return src;
  };

  return (
    <li className="px-4 py-2 hover:bg-gray-200">
      <Link className="flex gap-2" to={`/chats/${chatId}`}>
        <div className="border-1 size-14 shrink-0 overflow-clip rounded-full border-gray-400 bg-gray-200">
          <img
            className="h-full w-full object-cover"
            src={getChatAvatar()}
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg font-medium">{chatName}</h4>
          <p className="text-align -mt-1 items-start justify-self-start">
            {latestMessage
              ? `${latestMessage.content} • ${format(new Date(latestMessage.sendTime), 'MMM do • h:mmaaa')}`
              : 'start the conversation'}
          </p>
        </div>
      </Link>
    </li>
  );
};

export { ChatsListItem };
