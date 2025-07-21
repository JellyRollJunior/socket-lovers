import App from './App.jsx';
import { Home } from './pages/Home.jsx';
import { Chat } from './pages/Chat.jsx';
import { Login } from './pages/Login.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/chats/:chatId', element: <Chat /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export { routes };
