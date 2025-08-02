import { useContext, useEffect, useState } from 'react';
import { fetchUser } from '../services/userApi.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenError } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchUser(abortController.signal, userId);
                setUser(data);
            } catch (error) {
                handleTokenError(error);
                toast('Unable to fetch user data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();

        return () => abortController.abort();
    }, [userId, handleTokenError, toast]);

    return { user, isLoading };
};

export { useUser };
