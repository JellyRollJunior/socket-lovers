const attachSocketListeners = (io) => {
    io.on('connecton', (socket) => {
        console.log(`Hello socket ID: ${socket.id}`);
    });
};

export { attachSocketListeners };
