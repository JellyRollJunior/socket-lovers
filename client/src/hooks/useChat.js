import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { fetchChat } from '../services/chatApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { SocketContext } from '../contexts/SocketProvider.jsx';
import { useSocketErrorHandler } from './useSocketErrorHandler.js';

const createMessage = (senderId, username, content) => {
    const now = new Date().toISOString();
    return {
        id: now,
        content,
        sendTime: now,
        sender: {
            id: senderId,
            username,
        },
    };
};

const useChat = (chatId) => {
    const socket = useContext(SocketContext);
    const [chat, setChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);
    const { socketErrorHandler } = useSocketErrorHandler();

    // retrieve initial chat
    useEffect(() => {
        const abortController = new AbortController();
        const getChat = async () => {
            if (!chatId) return;
            try {
                setIsLoading(true);
                const chat = await fetchChat(chatId, abortController.signal);
                setChat({ id: chat.id, name: chat.name, users: chat.users });
                setMessages(chat.messages);
                setError(null)
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch chat');
                if (error.name == 'Validation Error') setError('Chat Id error');
            } finally {
                setIsLoading(false);
            }
        };

        getChat();

        return () => abortController.abort();
    }, [chatId, handleTokenErrors, toast]);

    // configure socket on receive_message
    useEffect(() => {
        if (!socket) return;
        socket.on('receive_message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => socket.off('receive_message');
    }, [socket, chatId]);

    const sendMessage = (id, username, text) => {
        if (!socket) return;
        // emit message to server
        socket.emit('send_message', chatId, text, socketErrorHandler);

        // display message on client
        setMessages((prev) => [...prev, createMessage(id, username, text)]);
    };

    const updateChatName = (name) => {
        setChat((prev) => {
            prev.name = name;
            return prev;
        })
    }

    return { chat, messages, sendMessage, updateChatName, isLoading, error };
};

export { useChat };
