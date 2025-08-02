import {
  useEffect,
  useState,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import dotMenu from '../assets/svgs/three-dots.svg';

const HeaderMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    // register listener to close menu if clicking outside menu
  }, []);

  return (
    <div className="relative ml-auto mt-1 self-center">
      <button
        className="rounded-lg py-1 hover:bg-gray-200"
        onClick={toggleMenu}
      >
        <img src={dotMenu} />
      </button>
      {isOpen && (
        <ul className="top-1/1 absolute right-0">
          {/* Pass close menu prop to children */}
          {Children.map(children, (child) =>
            isValidElement(child) ? cloneElement(child, { closeMenu }) : child
          )}
        </ul>
      )}
    </div>
  );
};

export { HeaderMenu };
