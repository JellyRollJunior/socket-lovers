import { format } from 'date-fns';
import { Fragment, useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const Messages = ({ messages }) => {
  const { id } = useContext(CurrentContext);

  // if (last message time - current message time) >= 12hr, show timestamp element
  return (
    <ul className="flex flex-col gap-3">
      {messages &&
        messages.map((message, index) => (
          <Fragment key={`${message.id}-wrapper`}>
            {(index == 0 ||
              new Date(message.sendTime) -
                new Date(messages[index - 1].sendTime) >=
                3200000) && (
              <li
                key={`${message.id}-timestamp`}
                className={`max-w-4/5 w-fit self-center rounded-3xl border-2 border-gray-100 bg-gray-50 px-5 py-2`}
              >
                {format(new Date(message.sendTime), 'EEEE LLLL do')}
              </li>
            )}
            <li
              key={message.id}
              className={`max-w-4/5 w-fit rounded-3xl border-2 border-gray-200 px-5 py-2 ${message.sender.id == id && 'self-end bg-gray-200'}`}
            >
              <h3>{message.content}</h3>
              <p
                className={`text-sm text-gray-500 ${message.sender.id == id && 'justify-self-end'}`}
              >
                {format(new Date(message.sendTime), 'h:mmaaa')}
              </p>
            </li>
          </Fragment>
        ))}
    </ul>
  );
};

export { Messages };
