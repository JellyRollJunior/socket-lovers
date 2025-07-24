import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const Toaster = () => {
  const { toasts } = useContext(ToastContext);
  return (
    <ul className="absolute left-1/2 top-1">
      {toasts && toasts.map((toast) => (
          <li className="text-3xl font-bold text-red-400" key={toast.id}>
            {toast.message}
          </li>
        ))}
    </ul>
  );
};

export { Toaster };
