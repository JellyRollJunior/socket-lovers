import { Fragment } from 'react';
import { usePublicChats } from '../hooks/usePublicChats.js';
import { ChatsLoading } from './ChatsLoading.jsx';
import { ChatsListItem } from './ChatsListItem.jsx';
import { RefreshButton } from './RefreshButton.jsx';

const ChatsPublic = () => {
  const { publicChats, isLoading, refetch } = usePublicChats();
  return (
    <>
      <div className="mt-5 flex items-center justify-between">
        <h3 className="pl-4 text-xl font-extrabold">Public Rooms</h3>
        <div className='mr-5.5'>
          <RefreshButton onclick={refetch} />
        </div>
      </div>
      <ul className="mt-2">
        {isLoading && <ChatsLoading items={1} />}
        {!isLoading &&
          publicChats.map((chat) => (
            <Fragment key={chat.id}>
              <ChatsListItem
                chatId={chat.id}
                chatName={chat.name}
                avatar={chat.avatar}
                latestMessage={chat.latestMessage}
              />
            </Fragment>
          ))}
      </ul>
    </>
  );
};

export { ChatsPublic };
