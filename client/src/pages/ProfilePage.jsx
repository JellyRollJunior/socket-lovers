import { useContext } from 'react';
import { Home } from '../components/Home.jsx';
import { Profile } from '../components/Profile.jsx';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const ProfilePage = () => {
  const { username, bio, avatar, isLoading } = useContext(CurrentContext);

  return (
    <div className="flex h-full">
      <aside className="border-r-1 min-w-xs flex-3 hidden max-w-sm border-gray-500 md:block">
        <Home />
      </aside>
      <div className="flex-8 mt-12 px-4">
        <Profile
          username={username}
          bio={bio}
          avatar={avatar}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export { ProfilePage };
