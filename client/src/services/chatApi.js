import { request } from './request.js';

const createChat = (name, userIds) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please login again.');
    const data = request('/chats', {
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

export { createChat };
