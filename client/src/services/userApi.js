import { request } from './request.js';

const fetchCurrent = async (signal) => {
    const data = await request(
        '/current',
        {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            signal,
        },
        true
    );
    return data;
};

const fetchUsers = async (signal) => {
    const data = await request(
        '/users',
        {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            signal,
        },
        true
    );
    return data;
};

export { fetchCurrent, fetchUsers };
