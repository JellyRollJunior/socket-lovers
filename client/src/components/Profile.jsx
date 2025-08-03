import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { Avatar } from './Avatar.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import editIcon from '../assets/svgs/edit.svg';

const Profile = ({
  userId,
  username,
  bio,
  avatar,
  isLoading = false,
  avatarSize = 8,
}) => {
  const { id } = useContext(CurrentContext);
  const [isEditingBio, setIsEditingBio] = useState(false);

  if (isLoading) {
    return (
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
    );
  }

  // id == current user id, allow editing
  const allowEdit = userId == id;
  return (
    <div className="min-w-2xs flex flex-col items-center justify-center">
      <div>
        <Avatar avatar={avatar} size={avatarSize} />
      </div>
      <h2 className="mt-1 self-center text-xl font-bold">{username}</h2>
      <div className="mt-2 flex w-full items-center self-start font-medium">
        <h3>Bio</h3>
        {allowEdit && (
          <button className="ml-auto" onClick={() => setIsEditingBio(true)}>
            <img
              className="w-7 rounded-xl px-1 py-1 hover:bg-gray-300"
              src={editIcon}
              alt="edit"
            />
          </button>
        )}
      </div>
      <p>{bio}</p>
    </div>
  );
};

export { Profile };
