import { Fragment } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const CreateChatLoadingItem = ({
  color = '#FFFFFF',
  transitionColor = '#E5E7EB',
}) => {
  return (
    <motion.li
      style={{ backgroundColor: color }}
      className="flex gap-2 px-4 py-2 rounded-sm"
      animate={{ backgroundColor: transitionColor }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.75,
        ease: 'easeInOut',
      }}
    >
      <button
        className="flex h-full w-full gap-2 rounded-sm px-2 py-1"
        type="button"
      >
        <div className="size-10 shrink-0 rounded-full bg-gray-200"></div>
        <div className="flex items-center">
          <h4 className="w-32 h-4 rounded-sm bg-gray-200 text-lg"></h4>
        </div>
      </button>
    </motion.li>
  );
};

const CreateChatLoadingItems = ({
  numItems,
  color = '#FFFFFF',
  transitionColor = '#E5E7EB',
}) => {
  return [...Array(numItems)].map((item, index) => (
    <Fragment key={index}>
      <CreateChatLoadingItem color={color} transitionColor={transitionColor} />
      <CreateChatLoadingItem color={transitionColor} transitionColor={color} />
    </Fragment>
  ));
};

export { CreateChatLoadingItems };
