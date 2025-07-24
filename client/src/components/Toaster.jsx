import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const Toaster = () => {
  const { toasts, deleteToast } = useContext(ToastContext);
  return (
    <ul className="absolute left-1/2 top-1">
      {toasts &&
        toasts.map((toast) => (
          <li className="flex items-center gap-1.5" key={toast.id}>
            <p className="text-3xl font-bold text-red-400">{toast.message}</p>
            {!toast.isTemp && (
              <button onClick={() => deleteToast(toast.id)}>×</button>
            )}
          </li>
        ))}
    </ul>
  );
};

export { Toaster };
