import { app } from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server, {});

io.on('connection', (socket) => {
    console.log('hello!');
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
