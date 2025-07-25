import { useContext, useState } from 'react';
import { useChats } from '../hooks/useChats.js';
import { Link } from 'react-router';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import newChatIcon from '../assets/svgs/edit-square.svg';
import { CreateChat } from './CreateChat.jsx';
import { ModalDialog } from './ModalDialog.jsx';

const Chats = () => {
  const { chats } = useChats();
  const { username } = useContext(CurrentContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="h-full pt-9">
      <header className="flex justify-between pl-5 pr-7">
        <h2 className="text-3xl font-bold">{username}</h2>
        <button className="mt-auto" onClick={() => setIsModalOpen(true)}>
          <img className="w-8" src={newChatIcon} alt="Create new chat icon" />
        </button>
      </header>
      <div className="px-3">
        <input
          className="mt-3 h-11 w-full rounded-md border-2 border-b-black"
          type="text"
        />
      </div>
      <h3 className="mt-5 pl-4 text-xl font-extrabold">Conversations</h3>
      <ul className="mt-2 overflow-scroll">
        {chats &&
          chats.map((chat) => (
            <li key={chat.id} className="px-4 py-2">
              <Link
                className="flex items-center gap-2"
                to={`/chats/${chat.id}`}
              >
                <div className="size-14 rounded-full border-2 border-black"></div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-medium">{chat.name}</h4>
                  <p className="items-start justify-self-start">
                    {chat.latestMessage
                      ? chat.latestMessage.content
                      : 'start the conversation'}
                  </p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
      <ModalDialog
        isOpen={isModalOpen}
        closeFunction={() => setIsModalOpen(false)}
      >
        <CreateChat />
      </ModalDialog>
    </section>
  );
};

export { Chats };
