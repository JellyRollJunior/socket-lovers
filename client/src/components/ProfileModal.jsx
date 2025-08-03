import { useUser } from '../hooks/useUser.js';
import { ModalDialog } from './ModalDialog.jsx';
import { Profile } from './Profile.jsx';

const ProfileModal = ({ isOpen, closeFunction, userId }) => {
  const { user, isLoading } = useUser(userId);

  return (
    <ModalDialog isOpen={isOpen} closeFunction={closeFunction}>
      {user && (
        <Profile
          id={user.id}
          username={user.username}
          bio={user.bio}
          avatar={user.avatar}
          isLoading={isLoading}
        />
      )}
    </ModalDialog>
  );
};

export { ProfileModal };
