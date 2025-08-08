import { useEffect, useState } from 'react';
import { ModalDialog } from './ModalDialog.jsx';
import { LabelledInput } from './LabelledInput.jsx';

const ChatRenameModal = ({ isOpen, closeFunction, chatName }) => {
  const [name, setName] = useState('');
  
  useEffect(() => {
    setName(chatName);
  }, [chatName]);

  const handleRenameChat = () => {};

  return (
    <ModalDialog isOpen={isOpen} closeFunction={closeFunction}>
      <form className="min-w-2xs flex flex-col" onSubmit={handleRenameChat}>
        <h2 className="mb-1 self-center text-lg font-bold">
          Rename Conversation
        </h2>
        <hr className="mb-4" />
        <LabelledInput
          id="New conversation name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={32}
          isRequired={false}
        />
        <footer className="mt-6">
          <button
            className="w-full rounded-md bg-blue-400 px-5 py-1.5 text-white hover:bg-blue-500 disabled:bg-gray-500 disabled:text-gray-100"
            // disabled={isLoading}
          >
            Rename
          </button>
        </footer>
      </form>
    </ModalDialog>
  );
};

export { ChatRenameModal };
