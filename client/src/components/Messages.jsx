import { format } from 'date-fns';
import { Fragment, useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const SystemMessage = ({ children }) => {
  return (
    <li className="max-w-4/5 w-fit self-center rounded-3xl border-2 border-gray-100 bg-gray-50 px-5 py-2">
      {children}
    </li>
  );
};

const MessagesLoadingAnimation = () => {
  return (
    <SystemMessage>
      {[...Array(3)].map((item, index) => (
        <Fragment key={index}>
          <motion.span
            className="inline-block"
            animate={{ translateY: -12 }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.8,
              delay: 0.2 * index,
              ease: 'easeInOut',
            }}
          >
            <div className="size-1 rounded-full bg-black"></div>
          </motion.span>{' '}
        </Fragment>
      ))}
    </SystemMessage>
  );
};

const Messages = ({ messages, isLoading = false }) => {
  const { id } = useContext(CurrentContext);

  // if (last message time - current message time) >= 12hr, show timestamp element
  return (
    <ul className="flex flex-col gap-3">
      {isLoading && <MessagesLoadingAnimation />}
      {!isLoading && messages && messages.length == 0 && (
        <SystemMessage>Start the conversation with a message!</SystemMessage>
      )}
      {!isLoading &&
        messages &&
        messages.map((message, index) => (
          <Fragment key={`${message.id}-wrapper`}>
            {(index == 0 ||
              new Date(message.sendTime) -
                new Date(messages[index - 1].sendTime) >=
                3200000) && (
              <SystemMessage>
                {format(new Date(message.sendTime), 'EEEE LLLL do')}
              </SystemMessage>
            )}
            <li
              key={message.id}
              className={`max-w-4/5 w-fit rounded-3xl border-2 border-gray-200 px-5 py-2 ${message.senderId == id && 'self-end bg-gray-200'}`}
            >
              <h3>{message.content}</h3>
              <p
                className={`text-sm text-gray-500 ${message.senderId == id && 'justify-self-end'}`}
              >
                {format(new Date(message.sendTime), 'h:mmaaa')}
              </p>
            </li>
          </Fragment>
        ))}
    </ul>
  );
};

export { Messages };
