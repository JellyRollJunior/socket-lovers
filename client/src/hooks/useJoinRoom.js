import { useContext, useEffect } from 'react';
import { SocketContext } from '../contexts/SocketProvider.jsx';

const useJoinRoom = ( chatId ) => {
    const socket = useContext(SocketContext);

    // Join chat room
    useEffect(() => {
        if (!socket) return;
        socket.emit('join_room', chatId, socketErrorCallback);
    }, [socket, chatId]);

    const socketErrorCallback = (error) => {
        // toast error.message
        console.log(error.message + ' i am a callback!!! yippee');
    };
};

export { useJoinRoom };
