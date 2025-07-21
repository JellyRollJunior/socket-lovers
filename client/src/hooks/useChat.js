import { useEffect, useState } from 'react';
import { fetchChat } from '../services/chatApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useChat = (chatId) => {
    const [chat, setChat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();

    useEffect(() => {
        const abortController = new AbortController();
        const getChat = async () => {
            if (!chatId) return;
            try {
                setIsLoading(true);
                const chat = await fetchChat(chatId, abortController.signal);
                setChat(chat);
            } catch (error) {
                handleTokenErrors(error);
                // toast error loading chat
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getChat();

        return () => abortController.abort();
    }, [chatId, handleTokenErrors]);

    return { chat, isLoading };
};

export { useChat };
