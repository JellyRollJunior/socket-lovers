import { Chats } from './components/Chats.jsx';
import { CreateChat } from './components/CreateChat.jsx';
import { Login } from './components/Login.jsx';
import { Messages } from './components/Messages.jsx';
import { SocketProvider } from './contexts/SocketProvider.jsx';

function App() {
  return (
    <SocketProvider>
      <h1>Hello World!</h1>
      <Chats />
      <Messages />
      <CreateChat />
      <Login />
    </SocketProvider>
  );
}

export default App;
