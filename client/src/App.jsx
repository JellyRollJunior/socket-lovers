import { Messages } from '../components/Messages.jsx';
import { SocketProvider } from '../contexts/SocketProvider.jsx';

function App() {
  return (
    <SocketProvider>
      <h1>Hello World!</h1>
      <Messages />
    </SocketProvider>
  );
}

export default App;
