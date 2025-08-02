import { useState } from 'react';
import dotMenu from '../assets/svgs/three-dots.svg';

const HeaderMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative ml-auto mt-1 self-center">
      <button
        className="rounded-lg py-1 hover:bg-gray-200"
        onClick={toggleMenu}
      >
        <img src={dotMenu} />
      </button>
      {isOpen && (
        <ul className="border-1 top-1/1 absolute right-0 border-black bg-gray-200">
          {children}
        </ul>
      )}
    </div>
  );
};

export { HeaderMenu };
