import { useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const Profile = () => {
  const { id, username } = useContext(CurrentContext);

  return (
    <div>
      <h1>Profile!</h1>
    </div>
  );
};

export { Profile };
