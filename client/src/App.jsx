import { Outlet } from 'react-router';
import { SocketProvider } from './contexts/SocketProvider.jsx';
import { CurrentProvider } from './contexts/CurrentProvider.jsx';
import { ToastProvider } from './contexts/ToastProvider.jsx';
import { Toaster } from './components/Toaster.jsx';
import { Navigation } from './components/Navigation.jsx';

function App() {
  return (
    <SocketProvider>
      <CurrentProvider>
        <ToastProvider>
          <Toaster />
          <Outlet />
          <Navigation />
        </ToastProvider>
      </CurrentProvider>
    </SocketProvider>
  );
}

export default App;
