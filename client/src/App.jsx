import { SocketProvider } from '../contexts/SocketProvider.jsx';

function App() {
  return (
    <SocketProvider>
      <h1>Hello World!</h1>
    </SocketProvider>
  );
}

export default App;
