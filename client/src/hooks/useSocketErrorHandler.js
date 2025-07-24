import { useCallback, useContext } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const useSocketErrorHandler = () => {
    const { toast } = useContext(ToastContext);

    const socketErrorHandler = useCallback(
        (error) => {
            toast(error.message);
            console.log(error);
        },
        [toast]
    );

    return { socketErrorHandler };
};

export { useSocketErrorHandler };
