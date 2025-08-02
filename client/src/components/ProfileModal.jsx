import { useUser } from '../hooks/useUser.js';
import { ModalDialog } from './ModalDialog.jsx';
import { Avatar } from './Avatar.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ProfileModal = ({ isOpen, closeFunction, userId }) => {
  const { user, isLoading } = useUser(userId);

  if (isLoading) {
    return (
      <ModalDialog isOpen={isOpen} closeFunction={closeFunction}>
        <div className="min-w-2xs flex flex-col items-center justify-center">
          <motion.div
            style={{ backgroundColor: '#f3f4f6' }}
            animate={{ backgroundColor: '#d1d5db' }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="size-32 shrink-0 rounded-full bg-gray-200"
          ></motion.div>
          <motion.h2
            style={{ backgroundColor: '#f3f4f6' }}
            animate={{ backgroundColor: '#d1d5db' }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="mt-2 h-4 w-36 self-center rounded-sm bg-gray-200 text-xl font-bold"
          ></motion.h2>
          <div className="mt-2 self-start font-medium text-gray-500">Bio</div>
          <motion.p
            style={{ backgroundColor: '#f3f4f6' }}
            animate={{ backgroundColor: '#d1d5db' }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="mt-2 h-14 w-full self-center rounded-sm bg-gray-200 text-xl font-bold"
          ></motion.p>
        </div>
      </ModalDialog>
    );
  }

  return (
    <ModalDialog isOpen={isOpen} closeFunction={closeFunction}>
      {user && (
        <div className="min-w-2xs flex flex-col items-center justify-center">
          <div>
            <Avatar avatar={user.avatar} size={8} />
          </div>
          <h2 className="mt-1 self-center text-xl font-bold">
            {user.username}
          </h2>
          <div className="mt-2 self-start font-medium text-gray-500">Bio</div>
          <p>{user.bio}</p>
        </div>
      )}
    </ModalDialog>
  );
};

export { ProfileModal };
