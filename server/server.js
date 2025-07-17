import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { app } from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { attachSocketListeners } from './sockets/socketListeners.js';
import { instrument } from '@socket.io/admin-ui';
dotenv.config();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            process.env.SERVER_URI,
            process.env.CLIENT_URI,
            'https://admin.socket.io',
        ],
        credentials: true,
    },
});

instrument(io, {
    auth: {
        type: 'basic',
        username: process.env.SOCKET_ADMIN_USERNAME,
        password: await bcrypt.hash(process.env.SOCKET_ADMIN_PASSWORD, 10),
    },
    mode: 'development',
});

attachSocketListeners(io);

const PORT = 3000;
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
