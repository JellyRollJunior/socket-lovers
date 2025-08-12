import { useState } from 'react';
import trio from '../assets/images/trio-cheer.png'

const Avatar = ({ avatar, isGroupChat = false, size = 4 }) => {
  const [error, setError] = useState(false);

  return (
    <div
      style={{ height: `${size}rem`, width: `${size}rem` }}
      className="border-1 shrink-0 overflow-clip rounded-full border-gray-400 bg-gray-200"
    >
      {!error && avatar && (
        <img
          className="h-full w-full border-none object-cover"
          src={isGroupChat ? trio : avatar}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export { Avatar };
