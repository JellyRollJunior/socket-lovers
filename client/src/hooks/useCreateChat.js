import { useContext, useState } from 'react';
import { postChat } from '../services/chatApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const useCreateChat = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    const createChat = async (name, chatters) => {
        setIsLoading(true);
        try {
            const data = await postChat(name, chatters);
            return data;
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to create chat');
        } finally {
            setIsLoading(false);
        }
    };

    return { createChat, isLoading };
};

export { useCreateChat };
