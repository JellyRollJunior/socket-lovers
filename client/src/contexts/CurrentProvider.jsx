import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCurrent } from '../services/userApi.js';
import { ToastContext } from './ToastProvider.jsx';
import { useTokenErrorHandler } from '../hooks/useTokenErrorHandler.js';

const CurrentContext = createContext({
  id: null,
  username: null,
  bio: null,
  avatar: null,
});

const CurrentProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleTokenErrors } = useTokenErrorHandler();
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    const abortController = new AbortController();
    const getCurrent = async () => {
      try {
        setIsLoading(true);
        const current = await fetchCurrent(abortController.signal);
        setId(current.id);
        setUsername(current.username);
        setBio(current.bio);
        setAvatar(current.avatar);
      } catch (error) {
        // error notification
        handleTokenErrors(error);
        toast('unable to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };

    getCurrent();

    return () => abortController.abort();
  }, [handleTokenErrors, toast]);

  return (
    <CurrentContext.Provider
      value={{ id, username, bio, avatar, isLoading, setBio, setAvatar }}
    >
      {children}
    </CurrentContext.Provider>
  );
};

export { CurrentProvider, CurrentContext };
