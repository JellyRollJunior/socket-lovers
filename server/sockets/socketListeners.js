const attachSocketListeners = (io) => {
    io.on('connection', (socket) => {
        console.log(`Connected with socket ID: ${socket.id}`);

        socket.on('send_message', (message) => {
            socket.broadcast.emit('receive_message', message);
        });
    });
};

export { attachSocketListeners };
