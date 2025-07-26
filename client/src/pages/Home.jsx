import { useState } from 'react';
import { Chats } from '../components/Chats.jsx';
import { ModalDialog } from '../components/ModalDialog.jsx';
import { CreateChat } from '../components/CreateChat.jsx';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNewChatModal = () => setIsModalOpen(true);
  const closeNewChatModal = () => setIsModalOpen(false);

  return (
    <>
      <Chats openNewChatModal={openNewChatModal} />
      <ModalDialog isOpen={isModalOpen} closeFunction={closeNewChatModal}>
        <CreateChat />
      </ModalDialog>
    </>
  );
};

export { Home };
