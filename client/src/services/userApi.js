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

const fetchUser = async (signal, userId) => {
    const data = await request(
        `/users/${userId}`,
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

const patchUserBio = async (userId, bio) => {
    const data = await request(
        `/users/${userId}`,
        {
            mode: 'cors',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bio,
            }),
        },
        true
    );
    return data;
};

export { fetchCurrent, fetchUsers, fetchUser, patchUserBio };
