import { Home } from '../components/Home.jsx';
import { Profile } from '../components/Profile.jsx';

const ProfilePage = () => {
  return (
    <div className="flex h-full">
      <aside className="border-r-1 min-w-xs flex-3 hidden max-w-sm border-gray-500 md:block">
        <Home />
      </aside>
      <div className="flex-8">
      <Profile />
      </div>
    </div>
  );
};

export { ProfilePage };
