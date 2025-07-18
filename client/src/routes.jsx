import App from './App.jsx';
import { Chats } from './components/Chats.jsx';
import { CreateChat } from './components/CreateChat.jsx';
import { Login } from './components/Login.jsx';
import { Messages } from './components/Messages.jsx';

// create a page folder for all the pages later
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
      { path: '/chats/:chatId', element: <Messages /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export { routes };
