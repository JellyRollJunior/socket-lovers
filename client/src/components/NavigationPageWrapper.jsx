import { Link } from 'react-router';
import { useLogout } from '../hooks/useLogout.js';
import logoutIcon from '../assets/svgs/logout.svg';
import homeIcon from '../assets/svgs/home.svg';
import accountIcon from '../assets/svgs/account.svg';

const NavigationPageWrapper = ({ children }) => {
  const { logout } = useLogout();

  return (
    <>
      <div className="pb-13 h-screen">{children}</div>
      <nav className="h-13 fixed bottom-0 flex w-full justify-around bg-gray-300">
        <button onClick={() => logout()}>
          <img className="w-8" src={logoutIcon} alt="Logout icon" />
        </button>
        <button>
          <Link to="/">
            <img className="w-8" src={homeIcon} alt="Home icon" />
          </Link>
        </button>
        <button>
          <img className="w-8" src={accountIcon} alt="Profile icon" />
        </button>
      </nav>
    </>
  );
};

export { NavigationPageWrapper };
