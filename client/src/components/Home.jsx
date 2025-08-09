import { useContext, useState } from 'react';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { Chats } from './Chats.jsx';
import { ModalDialog } from './ModalDialog.jsx';
import { CreateChatForm } from './CreateChatForm.jsx';

const Home = () => {
  const { chats, isLoading, refetchChats } = useContext(ChatsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNewChatModal = () => setIsModalOpen(true);
  const closeNewChatModal = () => setIsModalOpen(false);

  const handleCreateChat = () => {
    refetchChats();
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
