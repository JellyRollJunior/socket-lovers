const attachSocketListeners = (io) => {
    io.on('connection', (socket) => {
        console.log(`Hello socket ID: ${socket.id}`);
    });
};

export { attachSocketListeners };
