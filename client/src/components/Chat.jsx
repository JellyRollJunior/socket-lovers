import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contexts/SocketProvider.jsx';
import { useParams } from 'react-router';

const Chat = () => {
  const socket = useContext(SocketContext);
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!socket) return;
    socket.emit('join_room', chatId);
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off('receive_message');
  }, [socket, chatId]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    // display message on client
    setMessages((prev) => [...prev, text]);
    
    // emit message to server
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
      <form onSubmit={handleSendMessage}>
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

export { Chat };
