import dotenv from 'dotenv';
import { PrismaClient, CHAT_TYPE } from '@prisma/client';
import { CHATS_INCLUDE, USERS_INCLUDE } from './returnDataPresets.js';
import { DatabaseError } from '../errors/DatabaseError.js';
dotenv.config();

const prisma = new PrismaClient();

const getChats = async (userId) => {
    try {
        const data = await prisma.chat.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: CHATS_INCLUDE,
            orderBy: {
                latestMessage: {
                    sendTime: 'desc',
                },
            },
        });
        if (!data) return data;
        // return order: chats with latestMessage first (prisma returns null first)
        const messageIndex = data.findIndex((chat) => chat.latestMessage);
        const orderedData =
            messageIndex > 0
                ? [...data.slice(messageIndex), ...data.slice(0, messageIndex)]
                : data;
        return orderedData;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve chats');
    }
};

const getChatBySignature = async (userIdArray) => {
    try {
        if (!userIdArray || !Array.isArray(userIdArray)) return null;
        const signature = userIdArray.sort().join(':');
        const chat = await prisma.chat.findFirst({
            where: {
                signature,
            },
        });
        return chat;
    } catch (error) {
        throw new DatabaseError('Unable to create chat');
    }
};

const createChat = async (name, userIdArray) => {
    try {
        const sortedIds = userIdArray.sort();
        const signature = sortedIds.join(':');
        const userIdObjectArray = sortedIds.map((id) => ({ id }));
        const type =
            userIdArray.length > 2 ? CHAT_TYPE.GROUP : CHAT_TYPE.PRIVATE;
        // if groupchat, set default group chat avatar
        const avatar =
            userIdArray.length > 2
                ? process.env.SUPABASE_DEFAULT_GROUP_CHAT_AVATAR
                : null;
        const chat = await prisma.chat.create({
            data: {
                name,
                type,
                avatar,
                signature,
                users: {
                    connect: userIdObjectArray,
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

const updateChatName = async (chatId, name, userId) => {
    try {
        const chat = await prisma.chat.update({
            where: {
                id: chatId,
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            data: {
                name,
            },
        });
        return chat;
    } catch (error) {
        throw new DatabaseError('Unable to update chat');
    }
};

const deleteChat = async (chatId, userId) => {
    try {
        const data = await prisma.chat.delete({
            where: {
                id: chatId,
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: {
                users: {
                    include: USERS_INCLUDE,
                },
            },
        });
        return data;
    } catch (error) {
        if (error.code == 'P2025') {
            // P2025: An operation failed because it depends on one or more records that were required but not found
            throw new DatabaseError('Unable to delete chat', 404);
        }
        throw new DatabaseError('Unable to delete chat');
    }
};

export { getChats, getChatBySignature, createChat, updateChatName, deleteChat };
