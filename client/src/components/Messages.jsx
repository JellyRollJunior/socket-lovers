import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contexts/SocketProvider.jsx';

const Messages = () => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    if (!socket) return;
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    setMessages((prev) => [...prev, text]);
    if (socket) {
      socket.emit('send_message', text);
    }
    setText('');
  };

  const handleJoinRoom = (event) => {
    event.preventDefault();
    if (socket) {
      socket.emit('join_room', room);
    }
    setRoom('');
  };

  return (
    <>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
        <button>Send</button>
      </form>
      <form onSubmit={handleJoinRoom}>
        <input
          type="text"
          value={room}
          onChange={(event) => setRoom(event.target.value)}
          required
        />
        <button>Send</button>
      </form>
    </>
  );
};

export { Messages };
