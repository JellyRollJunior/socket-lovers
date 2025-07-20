import { Outlet } from 'react-router';
import { SocketProvider } from './contexts/SocketProvider.jsx';
import { CurrentProvider } from './contexts/CurrentProvider.jsx';

function App() {
  return (
    <SocketProvider>
      <CurrentProvider>
        <Outlet />
      </CurrentProvider>
    </SocketProvider>
  );
}

export default App;
