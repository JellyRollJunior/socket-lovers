import App from './App.jsx';
import { Chats } from './components/Chats.jsx';
import { CreateChat } from './components/CreateChat.jsx';
import { Login } from './components/Login.jsx';
import { Chat } from './components/Chat.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <>
            <Chats />
            <CreateChat />
          </>
        ),
      },
      { path: '/chats/:chatId', element: <Chat /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export { routes };
