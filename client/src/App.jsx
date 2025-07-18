import { Outlet } from 'react-router';
import { SocketProvider } from './contexts/SocketProvider.jsx';

function App() {
  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
}

export default App;
