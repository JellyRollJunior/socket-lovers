import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const Avatar = ({ users, avatar, size = 4 }) => {
  const { id, avatar: myAvatar } = useContext(CurrentContext);
  const [error, setError] = useState(false);

  let src = null;
  if (users && id) {
    // use first avatar of chatter id != current id
    users.forEach((user) => {
      if (user.avatar && user.id != id) src = user.avatar;
    });
    // else if self chat, use avatar from current id
    if (users.length == 1 && users[0].avatar) src = myAvatar;
  }

  return (
    <div
      style={{ height: `${size}rem`, width: `${size}rem` }}
      className="border-1 shrink-0 overflow-clip rounded-full border-gray-400 bg-gray-200"
    >
      {!error && (
        <img
          className="h-full w-full border-none object-cover"
          src={avatar ? avatar : src}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export { Avatar };
