import { Link, useLocation } from 'react-router';
import { useLogout } from '../hooks/useLogout.js';
import logoutIcon from '../assets/svgs/logout.svg';
import homeIcon from '../assets/svgs/home.svg';
import homeFilledIcon from '../assets/svgs/home-filled.svg';
import accountIcon from '../assets/svgs/account.svg';
import accountFilledIcon from '../assets/svgs/account-filled.svg';
import messagesIcon from '../assets/svgs/messages.svg';
import messagesFilledIcon from '../assets/svgs/messages-filled.svg';

const NavigationPageWrapper = ({ children }) => {
  const { logout } = useLogout();
  const location = useLocation();

  const path = location.pathname;
  return (
    <>
      <nav className="fixed bottom-0 flex h-12 w-full items-center justify-around bg-gray-300 md:top-0 md:h-full md:w-12 md:flex-col md:justify-start md:gap-6 md:pt-10">
        <button className="rounded-2xl px-1 py-1 hover:bg-gray-400"
          onClick={() => logout()}>
          <img className="w-8" src={logoutIcon} alt="Logout icon" />
        </button>
        <button className="rounded-2xl px-1 py-1 hover:bg-gray-400 md:mt-10">
          <Link to="/">
            <img
              className="w-8"
              src={path == '/' ? homeFilledIcon : homeIcon}
              alt="Home icon"
            />
          </Link>
        </button>
        <div>
          <img
              className="w-8"
              src={path.includes('chats') ? messagesFilledIcon : messagesIcon}
              alt="Home icon"
            />
        </div>
        <button className="rounded-2xl px-1 py-1 hover:bg-gray-400">
          <Link to="/profile">
            <img
              className="w-8"
              src={path == '/profile' ? accountFilledIcon : accountIcon}
              alt="Profile icon"
            />
          </Link>
        </button>
      </nav>
      <div className="h-screen pb-12 md:pb-0 md:pl-12">{children}</div>
    </>
  );
};

export { NavigationPageWrapper };
