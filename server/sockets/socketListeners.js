const handleSendMessage = (socket, message) => {
    socket.rooms.forEach((room) => {
        socket.to(room).emit('receive_message', message);
    });
};

const handleJoinRoom = (socket, room) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
};

export { handleSendMessage, handleJoinRoom };
