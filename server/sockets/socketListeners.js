import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticationError } from '../errors/AuthenticationError.js';
dotenv.config();

const handleVerifyToken = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new AuthenticationError())
    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        socket.data.user = data; // attach user info to socket
        next();
    } catch (error) {
        console.log('JWT Error: ', error);
        return next(new AuthenticationError());
    }
};

const attachSocketListeners = (io) => {
    io.use(handleVerifyToken);

    io.on('connection', (socket) => {
        console.log(`Connected with socket ID: ${socket.id}`);

        socket.on('send_message', (message) => {
            // socket.broadcast.emit('receive_message', message);
            socket.rooms.forEach((room) => {
                socket.to(room).emit('receive_message', message);
            });
        });

        socket.on('join_room', (room) => {
            socket.join(room);
            console.log(`${socket.id} joined room ${room}`);
        });
    });
};

export { attachSocketListeners };
