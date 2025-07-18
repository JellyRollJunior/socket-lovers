const handleSendMessage = (socket, message) => {
    socket.rooms.forEach((room) => {
        socket.to(room).emit('receive_message', message);
        console.log(`Emiting message to room: ${room}`)
    });
};

const handleJoinRoom = (socket, room) => {
    // leave all rooms besides [room: socket.id]
    socket.rooms.forEach((room) => {
        if (room != socket.id) {
            socket.leave(room);
            console.log(`${socket.id} has left room: ${room}`);
        }
    });
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
};

const handleDisconnecting = (socket) => {
    socket.rooms.forEach((room) => {
        socket.leave(room);
        console.log(`${socket.id} has left room: ${room}`);
    });
}

const handleDisconnect = (socket) => {
    console.log(`${socket.id} has disconnected`);
}


export { handleSendMessage, handleJoinRoom, handleDisconnecting, handleDisconnect };
