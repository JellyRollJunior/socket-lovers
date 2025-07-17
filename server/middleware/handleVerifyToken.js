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

export { handleVerifyToken }