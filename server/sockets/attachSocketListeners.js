import { handleVerifyToken } from "../middleware/handleVerifyToken.js";
import { handleJoinRoom, handleSendMessage } from "./socketListeners.js";

const attachSocketListeners = (io) => {
    io.use(handleVerifyToken);

    io.on('connection', (socket) => {
        console.log(`Connected with socket ID: ${socket.id}`);

        socket.on('send_message', (message) => handleSendMessage(socket, message));
        socket.on('join_room', (room) => handleJoinRoom(socket, room));
    });
};

export { attachSocketListeners };
