import { request } from './request.js';

const fetchChats = async (signal) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please login again.');
    const data = await request('/chats', {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
        },
        signal,
    });
    return data.chats;
};

const fetchChat = async (chatId, signal) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please login again.');
    const data = await request(`/chats/${chatId}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
        },
        signal,
    });
    return data;
};

const createChat = async (name, userIds) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please login again.');
    const data = await request('/chats', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
            name,
            userIds,
        }),
    });
    return data;
};

export { fetchChats, fetchChat, createChat };
