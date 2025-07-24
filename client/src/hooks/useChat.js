import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { fetchChat } from '../services/chatApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useChat = (chatId) => {
    const [chat, setChat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

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
                toast('Unable to fetch chat');
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getChat();

        return () => abortController.abort();
    }, [chatId, handleTokenErrors, toast]);

    return { chat, isLoading };
};

export { useChat };
