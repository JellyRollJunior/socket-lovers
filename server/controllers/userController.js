import * as userQueries from '../db/user.queries.js';
import bcrypt from 'bcryptjs';

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userQueries.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const postUser = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userQueries.createUser(username, hashedPassword);
        res.json({
            username: user.username,
        });
    } catch (error) {
        next(error);
    }
};

export { getAllUsers, postUser };
