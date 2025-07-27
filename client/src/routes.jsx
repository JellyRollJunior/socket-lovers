import App from './App.jsx';
import { Home } from './pages/Home.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/chats/:chatId', element: <ChatPage /> },
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
