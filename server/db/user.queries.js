import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getUserByUsername = async (username) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username,
            },
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Unable to fetch user');
    }
};

const getUserById = async (id) => {
    try {
        const user = await prisma.user.findFirst({
            select: {
                id: true,
                username: true,
            },
            where: {
                id,
            },
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Unable to fetch user');
    }
};

const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
            },
            orderBy: {
                username: 'asc',
            },
        });
        return { users };
    } catch (error) {
        throw new DatabaseError('Unable to fetch users');
    }
};

const createUser = async (username, password) => {
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password,
            },
        });
        return user;
    } catch (error) {
        if (error.code == 'P2002') {
            throw new DatabaseError('Username is already in use.', 409);
        }
        throw new DatabaseError('Unable to insert user');
    }
};

export { getUserByUsername, getUserById, getAllUsers, createUser };
