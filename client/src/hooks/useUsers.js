import { useEffect, useState } from 'react';
import { fetchUsers } from '../services/userApi.js';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const getUsers = async () => {
            try {
                setIsLoading(true);
                const data = await fetchUsers(abortController.signal);
                setUsers(data.users);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getUsers();

        return () => abortController.abort();
    }, []);

    return { users, isLoading };
};

export { useUsers };
