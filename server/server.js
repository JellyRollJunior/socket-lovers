import dotenv from 'dotenv';
import { app } from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { attachSocketListeners } from './sockets/socketListeners.js';
dotenv.config();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URI],
    },
});

attachSocketListeners(io);

const PORT = 3000;
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
