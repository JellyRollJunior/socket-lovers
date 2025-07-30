import App from './App.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/chats/:chatId', element: <ChatPage /> },
    ],
    errorElement: <ErrorPage />,
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
