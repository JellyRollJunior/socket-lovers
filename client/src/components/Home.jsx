import { useState } from 'react';
import { Chats } from './Chats.jsx';
import { ModalDialog } from './ModalDialog.jsx';
import { CreateChatForm } from './CreateChatForm.jsx';
import { useChats } from '../hooks/useChats.js';

const Home = () => {
  const { chats, isLoading, refetch } = useChats();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNewChatModal = () => setIsModalOpen(true);
  const closeNewChatModal = () => setIsModalOpen(false);

  const handleCreateChat = () => {
    refetch();
    closeNewChatModal();
  }

  return (
    <>
      <Chats chats={chats} isLoading={isLoading} openNewChatModal={openNewChatModal} />
      <ModalDialog isOpen={isModalOpen} closeFunction={closeNewChatModal}>
        <CreateChatForm onSubmit={handleCreateChat} />
      </ModalDialog>
    </>
  );
};

export { Home };
