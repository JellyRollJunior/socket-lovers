import { useContext, useRef, useState } from 'react';
import editIcon from '../assets/svgs/edit.svg';
import { patchUserAvatar } from '../services/userApi.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useTokenErrorHandler } from '../hooks/useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const ProfileEditAvatar = ({ isOpen }) => {
  const { id, setAvatar } = useContext(CurrentContext);
  const { toast } = useContext(ToastContext);
  const { handleTokenErrors } = useTokenErrorHandler();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleClickChangeAvatar = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarUpload = async (event) => {
    setIsLoading(true);
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('avatar', file);
        const data = await patchUserAvatar(id, formData);
        if (data.avatar) {
          setAvatar(data.avatar);
        }
      }
    } catch (error) {
      handleTokenErrors(error);
      toast('Unable to upload profile picture');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        style={{ display: isOpen ? 'flex' : 'none' }}
        className="absolute left-0 right-0 top-1/2 mx-auto flex h-full w-full translate-y-[-50%] flex-col items-center justify-center rounded-full bg-gray-300/70"
        onClick={handleClickChangeAvatar}
      >
        {isLoading ? (
          <div>uploading...</div>
        ) : (
          <>
            <img
              className="mt-2 w-7 rounded-xl px-1 py-1"
              src={editIcon}
              alt="edit"
            />
            Change profile
            <br /> picture
          </>
        )}
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
