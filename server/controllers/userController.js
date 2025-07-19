import * as userQueries from '../db/user.queries.js';
import { AuthenticationError } from '../errors/AuthenticationError.js';

const getCurrentUser = async (req, res, next) => {
    try {
        if (!req.user) throw new AuthenticationError();
        const user = await userQueries.getUserById(req.user.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userQueries.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export { getCurrentUser, getAllUsers };
