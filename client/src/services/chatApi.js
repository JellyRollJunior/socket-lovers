import { request } from './request.js';

const fetchChats = async (signal) => {
    const data = await request('/chats', {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        signal,
    });
    return data.chats;
};

const fetchChat = async (chatId, signal) => {
    const data = await request(`/chats/${chatId}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        signal,
    });
    return data;
};

const createChat = async (name, userIds) => {
    const data = await request('/chats', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            userIds,
        }),
    });
    return data;
};

export { fetchChats, fetchChat, createChat };
