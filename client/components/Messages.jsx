import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contexts/SocketProvider.jsx';

const Messages = () => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!socket) return;
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages((prev) => [...prev, text]);
    if (socket) {
      socket.emit('send_message', text);
    }
    setText('');
  };

  return (
    <>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
        <button>Send</button>
      </form>
    </>
  );
};

export { Messages };
