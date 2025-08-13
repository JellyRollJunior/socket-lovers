import dotenv from 'dotenv';
import { PrismaClient, CHAT_TYPE } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';
dotenv.config();

const prisma = new PrismaClient();

const getPublicChats = async () => {
    try {
        const data = await prisma.chat.findMany({
            where: {
                type: CHAT_TYPE.PUBLIC,
            },
            include: CHATS_INCLUDE,
            orderBy: {
                latestMessage: {
                    sendTime: 'desc',
                },
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve chats');
    }
};

const createPublicChat = async (name) => {
    try {
        const users = await getAllUsers();
        const chat = await prisma.chat.create({
            data: {
                name,
                type: CHAT_TYPES.PUBLIC,
                avatar: process.env.SUPABASE_DEFAULT_GROUP_CHAT_AVATAR,
                users: {
                    connect: users,
                },
            },
            include: {
                users: {
                    include: USERS_INCLUDE,
                },
            },
        });
        return chat;
    } catch (error) {
        throw new DatabaseError('Unable to create chat');
    }
};

const updateChatUsers = async (chatId, userId) => {
    try {
        const data = await prisma.chat.update({
            where: {
                id: chatId,
            },
            data: {
                users: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to update chat users');
    }
};

export { getPublicChats, createPublicChat, updateChatUsers };
