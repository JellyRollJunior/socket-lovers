import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useJoinRoom } from '../hooks/useJoinRoom.js';

const Chat = () => {
  const { chatId } = useParams();
  const { id, username } = useContext(CurrentContext);
  const { chat, messages, sendMessage } = useChat(chatId);
  const [text, setText] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(id, username, text);
    setText('');
  };

  // join room on mount
  useJoinRoom(chatId);

  return (
    <>
      <header className="border-b-1 flex gap-2 border-gray-500 px-4 py-4">
        <div className="size-14 rounded-full bg-gray-200"></div>
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">{chat && chat.name}</h2>
          <p className="text-align -mt-1 items-start justify-self-start">
            chat participants username
          </p>
        </div>
      </header>
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
