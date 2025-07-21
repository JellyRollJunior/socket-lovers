import { createContext, useState } from 'react';

const ToastContext = createContext({
  toasts: [],
  toast: () => {},
  toastTemp: () => {},
  deleteToast: () => {},
});

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = (message) => {
    const toastObject = {
      id: crypto.randomUUID(),
      message,
    };
    setToasts((prev) => [...prev, toastObject]);
    return toastObject;
  };

  const toastTemp = async (message, ms = 2000) => {
    const toastObject = toast(message);

    await new Promise((resolve) => setTimeout(resolve, ms));
    deleteToast(toastObject.id);
  };

  const deleteToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id != id));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, toastTemp, deleteToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
