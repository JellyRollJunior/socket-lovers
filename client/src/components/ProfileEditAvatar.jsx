import { useRef } from 'react';
import editIcon from '../assets/svgs/edit.svg';

const ProfileEditAvatar = () => {
  const fileInputRef = useRef(null);

  const clickFileInput = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <button
        className="absolute left-0 right-0 top-1/2 mx-auto flex h-full w-full translate-y-[-50%] flex-col items-center justify-center rounded-full bg-gray-300/70"
        onClick={clickFileInput}
      >
        <img
          className="mt-2 w-7 rounded-xl px-1 py-1"
          src={editIcon}
          alt="edit"
        />
        Change profile
        <br /> picture
      </button>
      <input ref={fileInputRef} className="hidden" type="file" />
    </>
  );
};

export { ProfileEditAvatar };
