import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useJoinRoom } from '../hooks/useJoinRoom.js';
import { Messages } from './Messages.jsx';

const Chat = () => {
  const { chatId } = useParams();
  const { id, username } = useContext(CurrentContext);
  const { chat, messages, isLoading, sendMessage } = useChat(chatId);
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

  const getChatAvatar = (users) => {
    let src = '';
    // use first avatar of chatter id != current id
    users.forEach((user) => {
      if (user.avatar && user.id != id) src = user.avatar;
    });
    // else if self chat, use avatar from current id
    if (users.length == 1 && users[0].avatar) src = users[0].avatar;
    return src;
  };

  return (
    <div className="flex h-full flex-col">
      <header className="border-b-1 flex gap-2 border-gray-500 px-4 py-4">
        <div className="border-1 size-12 shrink-0 overflow-clip rounded-full border-gray-400 bg-gray-200">
          <img className="h-full w-full object-cover" src={chat && chat.users ? getChatAvatar(chat.users) : null} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">{chat && chat.name}</h2>
          <p className="text-align -mt-1 items-start justify-self-start text-sm">
            {chat &&
              chat.users &&
              (chat.users.length == 1
                ? chat.users[0].username
                : chat.users
                    .filter((user) => user.id != id)
                    .map((user) => user.username)
                    .join(', '))}
          </p>
        </div>
      </header>
      <main
        ref={scrollContainerRef}
        className="scrollbar-thin flex-1 overflow-scroll pl-3 pr-4 pt-3"
      >
        <Messages messages={messages} isLoading={isLoading} />
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
  );
};

export { Chat };
