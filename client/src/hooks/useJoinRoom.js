import { useContext, useEffect } from 'react';
import { SocketContext } from '../contexts/SocketProvider.jsx';
import { useSocketErrorHandler } from './useSocketErrorHandler.js';

const useJoinRoom = (chatId) => {
    const socket = useContext(SocketContext);
    const { socketErrorHandler } = useSocketErrorHandler();

    // Join chat room
    useEffect(() => {
        if (!socket) return;
        socket.emit('join_room', chatId, socketErrorHandler);
    }, [socket, chatId, socketErrorHandler]);
};

export { useJoinRoom };
