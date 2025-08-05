import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { useTokenErrorHandler } from '../hooks/useTokenErrorHandler.js';
import { patchUserBio } from '../services/userApi.js';

const ProfileEditBio = ({ onSubmit }) => {
  const { id, bio, setBio } = useContext(CurrentContext);
  const { toast } = useContext(ToastContext);
  const { handleTokenErrors } = useTokenErrorHandler();
  const [bioTextarea, setBioTextarea] = useState(bio);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditBio = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await patchUserBio(id, bioTextarea);
      if (data && data.bio) {
        setBio(data.bio);
      }
    } catch (error) {
      handleTokenErrors(error);
      toast('Unable to edit bio');
    } finally {
      setIsLoading(false);
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleEditBio}>
      <textarea
        className="border-3 mt-3 min-h-36 w-full rounded-lg border-gray-500 px-1"
        autoFocus
        name="bio"
        id="bio"
        value={bioTextarea}
        onChange={(event) => setBioTextarea(event.target.value)}
        minLength={1}
        maxLength={500}
        required
      />
      <button
        className="w-full rounded-md bg-blue-400 px-5 py-1.5 text-white hover:bg-blue-500 disabled:bg-gray-500 disabled:text-gray-100"
        disabled={isLoading}
      >
        Edit
      </button>
    </form>
  );
};

export { ProfileEditBio };
