import App from './App.jsx';
import { Login } from './components/Login.jsx';
import { Messages } from './components/Messages.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/chats/:chatId',
    element: <App />,
  },
];

export { routes };
