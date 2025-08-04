import { useContext, useState } from 'react';
import { patchUserBio } from '../services/userApi.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { useTokenErrorHandler } from '../hooks/useTokenErrorHandler.js';
import { Avatar } from './Avatar.jsx';
import editIcon from '../assets/svgs/edit.svg';
import editOffIcon from '../assets/svgs/edit-off.svg';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const Profile = ({
  userId,
  username,
  bio,
  avatar,
  isLoading = false,
  avatarSize = 8,
}) => {
  const { id, setBio } = useContext(CurrentContext);
  const { toast } = useContext(ToastContext);
  const { handleTokenErrors } = useTokenErrorHandler();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioTextarea, setBioTextarea] = useState(bio);
  // id == current user id, allow editing
  const allowEdit = userId == id;

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

  const handleEditBio = async (event) => {
    event.preventDefault();
    // DISABLE BUTTONS WHILE LOADING
    try {
      const data = await patchUserBio(id, bioTextarea);
      if (data && data.bio) {
        setIsEditingBio(false);
        setBio(data.bio);
      }
    } catch (error) {
      handleTokenErrors(error);
      toast('Unable to edit bio');
    }
  };

  return (
    <div className="min-w-2xs flex flex-col items-center justify-center">
      <div>
        <Avatar avatar={avatar ? avatar : null} size={avatarSize} />
      </div>
      <h2 className="mt-1 self-center text-xl font-bold">{username}</h2>
      <div className="mt-2 flex w-full items-center self-start font-medium">
        <h3>Bio</h3>
        {allowEdit && (
          <button
            className="ml-auto"
            onClick={() => {
              setIsEditingBio(!isEditingBio);
              setBioTextarea(bio);
            }}
          >
            <img
              className="w-7 rounded-xl px-1 py-1 hover:bg-gray-300"
              src={!isEditingBio ? editIcon : editOffIcon}
              alt="edit"
            />
          </button>
        )}
      </div>
      <section className="w-full px-7">
        {!isEditingBio ? (
          <p className="px-1.5 py-0.5">{bio}</p>
        ) : (
          <form onSubmit={handleEditBio}>
            <textarea
              className="border-3 mt-3 min-h-36 w-full rounded-lg border-gray-500 px-1"
              autoFocus
              name="bio"
              id="bio"
              value={bioTextarea}
              onChange={(event) => setBioTextarea(event.target.value)}
            />
            <button className="w-full rounded-md bg-blue-400 px-5 py-1.5 text-white hover:bg-blue-500">
              Edit
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export { Profile };
