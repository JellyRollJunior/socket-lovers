import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const ChatMessageInput = ({ sendMessage }) => {
  const { id, username } = useContext(CurrentContext);
  const [text, setText] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(id, username, text);
    setText('');
  };

  return (
    <form
      className="mx-3 my-3 flex h-11 items-center gap-3 rounded-3xl border-2 border-gray-300 pl-3 pr-5"
      onSubmit={handleSendMessage}
    >
      <input
        className="h-7 w-full pl-1"
        id="text"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Message..."
        required
      />
      <button className="font-medium text-blue-500 hover:text-blue-400 hover:underline">
        Send
      </button>
    </form>
  );
};

export { ChatMessageInput };
