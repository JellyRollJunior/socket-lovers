import { Link, useLocation } from 'react-router';
import { useLogout } from '../hooks/useLogout.js';
import logoutIcon from '../assets/svgs/logout.svg';
import homeIcon from '../assets/svgs/home.svg';
import homeFilledIcon from '../assets/svgs/home-filled.svg';
import accountIcon from '../assets/svgs/account.svg';

const NavigationPageWrapper = ({ children }) => {
  const { logout } = useLogout();
  const location = useLocation();

  const path = location.pathname;

  return (
    <>
      <nav className="fixed bottom-0 flex h-12 w-full items-center justify-around bg-gray-300 md:top-0 md:pt-12 md:h-full md:w-12 md:flex-col md:justify-start md:gap-12">
        <button onClick={() => logout()}>
          <img className="w-8" src={logoutIcon} alt="Logout icon" />
        </button>
        <button>
          <Link to="/">
            <img
              className="w-8"
              src={path == '/' ? homeFilledIcon : homeIcon}
              alt="Home icon"
            />
          </Link>
        </button>
        <button>
          <img className="w-8" src={accountIcon} alt="Profile icon" />
        </button>
      </nav>
      <div className="h-screen pb-12 md:pb-0 md:pl-12">{children}</div>
    </>
  );
};

export { NavigationPageWrapper };
