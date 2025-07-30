import { Chat } from '../components/Chat.jsx';
import { Home } from '../components/Home.jsx';
import { TwoColumnLayout } from '../components/TwoColumnLayout.jsx';

const ChatPage = () => {
  return (
    <TwoColumnLayout aside={<Home />}>
      <Chat />
    </TwoColumnLayout>
  );
};

export { ChatPage };
