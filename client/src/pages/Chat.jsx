import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useJoinRoom } from '../hooks/useJoinRoom.js';

const Chat = () => {
  const { chatId } = useParams();
  const { id, username } = useContext(CurrentContext);
  useJoinRoom(chatId);
  const { chat, messages, sendMessage } = useChat(chatId);
  const [text, setText] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(id, username, text)
    setText('');
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
