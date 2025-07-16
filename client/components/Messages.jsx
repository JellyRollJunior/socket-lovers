import { useState } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages((prev) => [...prev, text]);
    setText('');
  };

  return (
    <>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
        <button>Send</button>
      </form>
    </>
  );
};

export { Messages };
