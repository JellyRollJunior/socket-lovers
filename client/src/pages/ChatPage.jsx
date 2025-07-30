import { Chat } from '../components/Chat.jsx';
import { HomePage } from './HomePage.jsx';

const ChatPage = () => {
  return (
    <div className="flex h-full">
      <div className="border-r-1 min-w-xs max-w-sm flex-3 hidden border-gray-500 md:block">
        <HomePage />
      </div>
      <div className="flex-8">
        <Chat />
      </div>
    </div>
  );
};

export { ChatPage };
