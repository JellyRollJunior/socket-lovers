import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contexts/SocketProvider.jsx';
import { useParams } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const createMessage = (senderId, username, content) => {
  const now = new Date().toISOString();
  return {
    id: now,
    content,
    sendTime: now,
    sender: {
      id: senderId,
      username,
    },
  };
};

const Chat = () => {
  const socket = useContext(SocketContext);
  const { id, username } = useContext(CurrentContext);
  const { chatId } = useParams();
  const { chat } = useChat(chatId);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  // Retrieve initial message data
  useEffect(() => {
    if (!chat || chat.length == 0) return;
    setMessages(chat.messages);
  }, [chat]);

  // Join chat room on load and handle receive_message from server
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
    setMessages((prev) => [...prev, createMessage(id, username, text)]);

    // emit message to server
    if (socket) {
      // TODO: once toast is ready, change callback to toast error
      socket.emit('send_message', chatId, null, (error) =>
        console.log(error.message + ' i am a callback!!! yippee')
      );
    }
    setText('');
  };

  return (
    <>
      <h2>Messages</h2>
      <h3>Chat: {chat && chat.name}</h3>
      <ul>
        {messages && messages.map((message) => <li>{message.content}</li>)}
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
