import { useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const Avatar = ({ users, avatar, size = 14 }) => {
  const { id } = useContext(CurrentContext);

  let src = null;
  if (users && id) {
    // use first avatar of chatter id != current id
    users.forEach((user) => {
      if (user.avatar && user.id != id) src = user.avatar;
    });
    // else if self chat, use avatar from current id
    if (users.length == 1 && users[0].avatar) src = users[0].avatar;
  }

  return (
    <div
      className={`border-1 size-${size} shrink-0 overflow-clip rounded-full border-gray-400 bg-gray-200`}
    >
      <img className="h-full w-full object-cover" src={avatar ? avatar : src} />
    </div>
  );
};

export { Avatar };
