import { useEffect, useState } from 'react';
import { fetchChats } from '../services/chatApi.js';

const useChats = () => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        const getChats = async () => {
            try {
                setIsLoading(true);
                const data = await fetchChats(abortController.signal);
                setChats(data);
            } catch (error) {
                // throw error notification
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getChats();

        return () => abortController.abort();
    }, []);

    return { chats, isLoading };
};

export { useChats };
