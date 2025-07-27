import App from './App.jsx';
import { Home } from './pages/Home.jsx';
import { Chat } from './pages/Chat.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';

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
  {
    path: '/signup',
    element: <Signup />,
  },
];

export { routes };
