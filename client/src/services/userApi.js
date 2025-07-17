import { request } from './request.js';

const getUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please login again.');
    const data = await request('/users', {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return data;
};

export { getUsers };
