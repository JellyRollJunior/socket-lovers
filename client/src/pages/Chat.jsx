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
      <div className="flex h-full flex-col">
        <header className="border-b-1 flex gap-2 border-gray-500 px-4 py-4">
          <div className="size-14 rounded-full bg-gray-200"></div>
          <div className="flex flex-col">
            <h2 className="text-lg font-medium">{chat && chat.name}</h2>
            <p className="text-align -mt-1 items-start justify-self-start">
              chat participants username
            </p>
          </div>
        </header>
        <main className="flex-1">
          <ul>
            {messages && messages.map((message) => <li>{message.content}</li>)}
          </ul>
        </main>
        <form
          className="mx-3 mb-3 flex gap-3 h-11 rounded-3xl border-gray-300 border-2 pl-3 pr-5 items-center"
          onSubmit={handleSendMessage}
        >
          <input
            className="w-full h-7  pl-1"
            id='text'
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder='Message...'
            required
          />
          <button className="font-medium text-blue-500 hover:text-blue-400 hover:underline">Send</button>
        </form>
      </div>
    </>
  );
};

export { Chat };
