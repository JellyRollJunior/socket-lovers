import { useCallback } from 'react';
import { TokenError } from '../errors/TokenError.js';
import { useLogout } from './useLogout.js';

const useTokenErrorHandler = () => {
    const { logout } = useLogout();

    // handle token not found and token authentication errors
    const handleTokenErrors = useCallback(
        (error) => {
            if (
                error instanceof TokenError ||
                error.name == 'Authentication Error'
            ) {
                // NOTIFICATION: Unable to authenticate, please log in again.
                logout();
            }
        },
        [logout]
    );

    return { handleTokenErrors };
};

export { useTokenErrorHandler };
