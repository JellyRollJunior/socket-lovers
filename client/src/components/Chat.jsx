import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useJoinRoom } from '../hooks/useJoinRoom.js';
import { Avatar } from './Avatar.jsx';
import { Messages } from './Messages.jsx';
import { ProfileModal } from './ProfileModal.jsx';
import { HeaderMenu } from './HeaderMenu.jsx';
import { HeaderMenuItem } from './HeaderMenuItem.jsx';

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

  // get other chatters
  let chatters = [];
  if (chat && chat.users) {
    chatters =
      chat.users.length == 1
        ? [chat.users[0]]
        : chat.users.filter((user) => user.id != id);
  }
  const chatterNames = chatters.map((user) => user.username).join(', ');

  // profile modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openProfileModal = () => setIsModalOpen(true);
  const closeProfileModal = () => setIsModalOpen(false);

  return (
    <div className="flex h-full flex-col">
      <header className="border-b-1 flex gap-2 border-gray-500 px-4 py-4">
        <Avatar users={chat ? chat.users : null} size={3} />
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">
            {chat && chat.name ? chat.name : chatterNames}
          </h2>
          <p className="text-align -mt-1 items-start justify-self-start text-sm">
            {chatterNames}
          </p>
        </div>
        <HeaderMenu>
          <HeaderMenuItem label="View profile" onClick={openProfileModal} />
        </HeaderMenu>
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
      <ProfileModal
        isOpen={isModalOpen}
        closeFunction={closeProfileModal}
        userId={chatters[0] ? chatters[0].id : null}
      />
    </div>
  );
};

export { Chat };
