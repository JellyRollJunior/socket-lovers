import { useRef } from 'react';
import editIcon from '../assets/svgs/edit.svg';

const ProfileEditAvatar = ({ isOpen }) => {
  const fileInputRef = useRef(null);

  const handleClickChangeAvatar = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarUpload = (event) => {
    console.log('swag')
  };

  return (
    <>
      <button
        style={{ display: isOpen ? 'flex' : 'none'}}
        className="absolute left-0 right-0 top-1/2 mx-auto flex h-full w-full translate-y-[-50%] flex-col items-center justify-center rounded-full bg-gray-300/70"
        onClick={handleClickChangeAvatar}
      >
        <img
          className="mt-2 w-7 rounded-xl px-1 py-1"
          src={editIcon}
          alt="edit"
        />
        Change profile
        <br /> picture
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleAvatarUpload}
      />
    </>
  );
};

export { ProfileEditAvatar };
