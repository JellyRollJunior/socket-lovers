import { Fragment } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ChatLoadingItem = ({
  color = '#FFFFFF',
  transitionColor = '#E5E7EB',
}) => {
  return (
    <motion.li
      style={{ backgroundColor: color }}
      className="flex gap-2 bg-white px-4 py-2"
      animate={{ backgroundColor: transitionColor }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.75,
        ease: 'easeInOut',
      }}
    >
      <div className="size-14 shrink-0 rounded-full bg-gray-200"></div>
      <div className="flex flex-col justify-center">
        <h4 className="w-18 h-4 rounded-sm bg-gray-200 text-lg font-medium"></h4>
        <p className="text-align w-30 mt-1 h-4 items-start justify-self-start rounded-sm bg-gray-200"></p>
      </div>
    </motion.li>
  );
};

const ChatsLoadingItems = ({
  numItems,
  color = '#FFFFFF',
  transitionColor = '#E5E7EB',
}) => {
  return [...Array(numItems)].map((item, index) => (
    <Fragment key={index}>
      <ChatLoadingItem color={color} transitionColor={transitionColor} />
      <ChatLoadingItem color={transitionColor} transitionColor={color} />
    </Fragment>
  ));
};

export { ChatsLoadingItems };
