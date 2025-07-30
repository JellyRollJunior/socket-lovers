import { useState } from 'react';
import { Chats } from './Chats.jsx';
import { ModalDialog } from './ModalDialog.jsx';
import { CreateChatForm } from './CreateChatForm.jsx';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNewChatModal = () => setIsModalOpen(true);
  const closeNewChatModal = () => setIsModalOpen(false);

  return (
    <>
      <Chats openNewChatModal={openNewChatModal} />
      <ModalDialog isOpen={isModalOpen} closeFunction={closeNewChatModal}>
        <CreateChatForm />
      </ModalDialog>
    </>
  );
};

export { Home };
