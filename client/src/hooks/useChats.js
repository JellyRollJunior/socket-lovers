import { useEffect, useState } from 'react';
import { fetchChats } from '../services/chatApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useChats = () => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();

    useEffect(() => {
        const abortController = new AbortController();
        const getChats = async () => {
            try {
                setIsLoading(true);
                const data = await fetchChats(abortController.signal);
                setChats(data);
            } catch (error) {
                handleTokenErrors(error);
                // throw error notification
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getChats();

        return () => abortController.abort();
    }, [handleTokenErrors]);

    return { chats, isLoading };
};

export { useChats };
