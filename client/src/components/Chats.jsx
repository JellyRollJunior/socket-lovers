import { useChats } from "../hooks/useChats.js";

const Chats = () => {
  const { chats } = useChats();

  return (
    <>
      <h2>Chats</h2>
      <ul>
        {chats && chats.map((chat) => (
          <li key={chat.id}>{chat.name}</li>
        ))}
      </ul>
    </>
  );
};

export { Chats };
