import { useUser } from '../hooks/useUser.js';
import { ModalDialog } from './ModalDialog.jsx';
import { Avatar } from './Avatar.jsx';

const ProfileModal = ({ isOpen, closeFunction, userId }) => {
  const { user, isLoading } = useUser(userId);

  // username, avatar, bio
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
