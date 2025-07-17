const attachSocketListeners = (io) => {
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
        })
    });
};

export { attachSocketListeners };
