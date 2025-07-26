import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const Toaster = () => {
  const { toasts, deleteToast } = useContext(ToastContext);

  return (
    <ul className="absolute left-1/2 top-5 flex translate-x-[-50%] flex-col gap-2">
      {toasts &&
        toasts.map((toast) => (
          <li
            className={`flex items-center justify-between gap-3 rounded-2xl pl-4 pr-3 py-1 text-white ${toast.isError ? `bg-red-400` : `bg-gray-500`}`}
            key={toast.id}
          >
            <p>{toast.message}</p>
            {!toast.isTemp && (
              <button onClick={() => deleteToast(toast.id)}>×</button>
            )}
          </li>
        ))}
    </ul>
  );
};

export { Toaster };
