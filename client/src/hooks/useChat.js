import { useEffect, useState } from 'react';
import { fetchChat } from '../services/chatApi.js';

const useChat = (chatId) => {
    const [chat, setChat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const getChat = async () => {
            if (!chatId) return;
            try {
                setIsLoading(true);
                const chat = await fetchChat(chatId, abortController.signal);
                setChat(chat);
            } catch (error) {
                // toast error
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getChat();

        return () => abortController.abort();
    }, [chatId]);

    return { chat, isLoading };
};

export { useChat };
