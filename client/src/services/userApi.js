import { request } from './request.js';

const fetchUsers = async (signal) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please login again.');
    const data = await request('/users', {
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

export { fetchUsers };
