import { createContext, useEffect, useState } from 'react';
import { fetchCurrent } from '../services/userApi.js';

const CurrentContext = createContext({
  id: null,
  username: null,
});

const CurrentProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const getCurrent = async () => {
      try {
        const current = await fetchCurrent(abortController.signal);
        setId(current.id);
        setUsername(current.username);
      } catch (error) {
        // error notification
        console.log(error);
      }
    };

    getCurrent();

    return () => abortController.abort();
  }, []);

  return (
    <CurrentContext.Provider value={{ id, username }}>
      {children}
    </CurrentContext.Provider>
  );
};

export { CurrentProvider, CurrentContext };
