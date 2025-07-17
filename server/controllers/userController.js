import * as userQueries from '../db/user.queries.js';

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userQueries.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export { getAllUsers };
