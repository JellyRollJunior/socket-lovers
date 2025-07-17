import { request } from './request.js';

const login = async (username, password) => {
    const data = await request('/login', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    return data;
};

export { login };
