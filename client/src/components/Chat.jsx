import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useJoinRoom } from '../hooks/useJoinRoom.js';
import { Messages } from './Messages.jsx';

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

  // scroll to bottom of messages on message change
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    const element = scrollContainerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="flex h-full flex-col">
        <header className="border-b-1 flex gap-2 border-gray-500 px-4 py-4">
          <div className="size-12 rounded-full bg-gray-200"></div>
          <div className="flex flex-col">
            <h2 className="text-lg font-medium">{chat && chat.name}</h2>
            <p className="text-align -mt-1 items-start justify-self-start">
              chat participants username
            </p>
          </div>
        </header>
        <main
          ref={scrollContainerRef}
          className="scrollbar-thin flex-1 overflow-scroll pl-3 pr-4 pt-3"
        >
          <Messages messages={messages} />
        </main>
        <form
          className="mx-3 my-3 flex h-11 items-center gap-3 rounded-3xl border-2 border-gray-300 pl-3 pr-5"
          onSubmit={handleSendMessage}
        >
          <input
            className="h-7 w-full pl-1"
            id="text"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Message..."
            required
          />
          <button className="font-medium text-blue-500 hover:text-blue-400 hover:underline">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export { Chat };
