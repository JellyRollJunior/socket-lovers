import { createSocketError } from '../errors/SocketError.js';
import * as messageQueries from '../db/message.queries.js';

const handleJoinRoom = (socket, room, callback) => {
    if (!room) return callback(createSocketError(`Unable to join room id: ${room}`));
    // leave all rooms besides [room: socket.id]
    socket.rooms.forEach((room) => {
        if (room != socket.id) {
            socket.leave(room);
            console.log(`${socket.id} has left room: ${room}`);
        }
    });
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
};

const handleSendMessage = async (socket, chatId, content, callback) => {
    try {
        if (!chatId || !content || content.length > 250 || content.trim().length <= 0) throw Error('Payload error');
        const message = await messageQueries.createMessage(
            chatId,
            socket.data.user.id,
            content.trim()
        );
        socket.rooms.forEach((room) => {
            socket.to(room).emit('receive_message', message);
            console.log(`Emiting message to room: ${room}`);
        });
    } catch (error) {
        return callback(error);
    }
};

const handleDisconnecting = (socket) => {
    socket.rooms.forEach((room) => {
        socket.leave(room);
        console.log(`${socket.id} has left room: ${room}`);
    });
};

const handleDisconnect = (socket) => {
    console.log(`${socket.id} has disconnected`);
};

export {
    handleJoinRoom,
    handleSendMessage,
    handleDisconnecting,
    handleDisconnect,
};
