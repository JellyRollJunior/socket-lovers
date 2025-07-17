import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as userQueries from '../db/user.queries.js';
import { AuthenticationError } from '../errors/AuthenticationError.js';
dotenv.config();

const signup = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userQueries.createUser(username, hashedPassword);
        res.json({
            id: user.id,
            username: user.username,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        // authenticate user credentials
        const username = req.body.username;
        const password = req.body.password;
        const user = await userQueries.getUserByUsername(username);
        if (!user) throw new AuthenticationError();
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new AuthenticationError();

        // send token once authenticated
        const options = { expiresIn: 60 * 60 * 24 }; // 24 hours
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.TOKEN_SECRET,
            options
        );
        res.json({
            id: user.id,
            username: user.username,
            token 
        });
    } catch (error) {
        next(error);
    }
};

export { signup, login };
