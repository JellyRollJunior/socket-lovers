import { Outlet } from 'react-router';
import { SocketProvider } from './contexts/SocketProvider.jsx';
import { CurrentProvider } from './contexts/CurrentProvider.jsx';
import { ToastProvider } from './contexts/ToastProvider.jsx';
import { Toaster } from './components/Toaster.jsx';
import { NavigationPageWrapper } from './components/NavigationPageWrapper.jsx';

function App() {
  return (
    <SocketProvider>
      <CurrentProvider>
        <ToastProvider>
          <Toaster />
          <NavigationPageWrapper>
            <Outlet />
          </NavigationPageWrapper>
        </ToastProvider>
      </CurrentProvider>
    </SocketProvider>
  );
}

export default App;
