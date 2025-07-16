import { io } from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';

const SERVER_URL = 'http://localhost:3000';

const SocketContext = createContext({
  socket: null,
});

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(SERVER_URL);

    setSocket(socket);

    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
