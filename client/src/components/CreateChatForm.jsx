import { useContext, useState } from 'react';
import { useUsers } from '../hooks/useUsers.js';
import { createChat } from '../services/chatApi.js';
import { useTokenErrorHandler } from '../hooks/useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { useNavigate } from 'react-router';
import { LabelledInput } from './LabelledInput.jsx';

const CreateChatForm = () => {
  const navigate = useNavigate();
  const { users } = useUsers();
  const [selectedUsers, setSelectedUsers] = useState('');
  const [name, setName] = useState('');
  const [isSelectErrorShown, setIsSelectErrorShown] = useState(false);
  const { handleTokenErrors } = useTokenErrorHandler();
  const { toastTemp } = useContext(ToastContext);

  const handleCreateChat = async (event) => {
    event.preventDefault();
    if (!selectedUsers || selectedUsers == '') return setIsSelectErrorShown(true);
    try {
      // currently only support selecting one user, so put selected user in an array
      const data = await createChat(name, [selectedUsers]);
      // Move user to messages with new chat!
      setName('');
      setIsSelectErrorShown(false);
      navigate(`/chats/${data.id}`);
    } catch (error) {
      handleTokenErrors(error);
      toastTemp('Unable to create chat', true);
    }
  };

  return (
    <form className="min-w-2xs flex flex-col" onSubmit={handleCreateChat}>
      <h2 className="mb-1 self-center text-lg font-bold">New Conversation</h2>
      <hr className="mb-4" />
      <label className="font-medium text-gray-500">Users <span className='text-red-400'>{isSelectErrorShown && '— Please select a chat partner'}</span></label>
      <ul className="scrollbar-thin mt-1 h-40 overflow-scroll">
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <button
                className={`flex h-full w-full gap-2 rounded-sm px-2 py-1 ${selectedUsers == user.id && 'bg-gray-200'}`}
                onClick={() => setSelectedUsers(user.id)}
              >
                <div className="size-10 shrink-0 rounded-full bg-gray-200"></div>
                <div className="flex items-center">
                  <h4 className="text-lg font-medium">{user.username}</h4>
                </div>
              </button>
            </li>
          ))}
      </ul>
      <LabelledInput
        id="Conversation name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        minLength={1}
        maxLength={24}
      />
      <footer className="mt-3">
        <button className="w-full rounded-md bg-blue-400 px-5 py-1.5 text-white hover:bg-blue-500">
          Chat
        </button>
      </footer>
    </form>
  );
};

export { CreateChatForm };
