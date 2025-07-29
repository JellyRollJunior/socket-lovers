import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { fetchChats } from '../services/chatApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useChats = () => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    useEffect(() => {
        const abortController = new AbortController();
        const getChats = async () => {
            try {
                setIsLoading(true);
                const data = await fetchChats(abortController.signal);
                setChats(data);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch chats')
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getChats();

        return () => abortController.abort();
    }, [handleTokenErrors, toast]);

    return { chats, isLoading };
};

export { useChats };
