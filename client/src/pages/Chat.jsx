import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contexts/SocketProvider.jsx';
import { useParams } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const Chat = () => {
  const socket = useContext(SocketContext);
  const { id, username } = useContext(CurrentContext);
  const { chatId } = useParams();
  const { chat, messages, sendMessage } = useChat(chatId);
  const [text, setText] = useState('');

  // Join chat room on load and handle receive_message from server
  useEffect(() => {
    if (!socket) return;
    socket.emit('join_room', chatId, socketErrorCallback);
  }, [socket, chatId]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(id, username, text)
    setText('');
  };

  const socketErrorCallback = (error) => {
    // toast error.message
    console.log(error.message + ' i am a callback!!! yippee');
  };

  return (
    <>
      <h2>Messages</h2>
      <h3>Chat: {chat && chat.name}</h3>
      <ul>
        {messages &&
          messages.map((message) => <li>{message.content}</li>)}
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
