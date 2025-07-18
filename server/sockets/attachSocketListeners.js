import { handleVerifyToken } from "../middleware/handleVerifyToken.js";
import { handleJoinRoom, handleSendMessage, handleDisconnecting, handleDisconnect } from "./socketListeners.js";

const attachSocketListeners = (io) => {
    io.use(handleVerifyToken);

    io.on('connection', (socket) => {
        console.log(`Connected with socket ID: ${socket.id}`);

        socket.on('send_message', (message) => handleSendMessage(socket, message));
        socket.on('join_room', (room) => handleJoinRoom(socket, room));
        socket.on('disconnecting', () => handleDisconnecting(socket));
        socket.on('disconnect', () => handleDisconnect(socket));
    });
};

export { attachSocketListeners };
