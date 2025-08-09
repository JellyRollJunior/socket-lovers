import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useJoinRoom } from '../hooks/useJoinRoom.js';
import { Avatar } from './Avatar.jsx';
import { HeaderMenu } from './HeaderMenu.jsx';
import { HeaderMenuItem } from './HeaderMenuItem.jsx';
import { Messages } from './Messages.jsx';
import { ChatMessageInput } from './ChatMessageInput.jsx';
import { ChatProfileModal } from './ChatProfileModal.jsx';
import { ChatRenameModal } from './ChatRenameModal.jsx';

const Chat = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { id } = useContext(CurrentContext);
  const { chat, messages, sendMessage, updateChatName, isLoading, error } = useChat(chatId);

  // if invalid chatId, go to index
  if (error == 'Chat Id error') navigate('/');

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
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  // rename chat modal
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const openRenameModal = () => setIsRenameModalOpen(true);
  const closeRenameModal = () => setIsRenameModalOpen(false);
  const onSubmitRenameChat = (name) => {
    updateChatName(name);
  }

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
          <HeaderMenuItem label="Rename conversation" onClick={openRenameModal} />
        </HeaderMenu>
      </header>
      <main
        ref={scrollContainerRef}
        className="scrollbar-thin flex-1 overflow-scroll pl-3 pr-4 pt-3"
      >
        <Messages messages={messages} isLoading={isLoading} />
      </main>
      <ChatMessageInput sendMessage={sendMessage} />
      <ChatProfileModal
        isOpen={isProfileModalOpen}
        closeFunction={closeProfileModal}
        userId={chatters[0] ? chatters[0].id : null}
      />
      <ChatRenameModal
        isOpen={isRenameModalOpen}
        closeFunction={closeRenameModal}
        chatName={chat && chat.name ? chat.name : ''}
        onSubmit={onSubmitRenameChat}
      />
    </div>
  );
};

export { Chat };
