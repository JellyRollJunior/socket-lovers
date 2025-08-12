import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

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
            select: {
                id: true,
                name: true,
                users: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
                latestMessage: {
                    select: {
                        id: true,
                        content: true,
                        sendTime: true,
                        senderId: true,
                    },
                },
            },
            orderBy: {
                latestMessage: {
                    sendTime: 'desc',
                },
            },
        });
        if (!data) return data;
        // return order: chats with latestMessage first (prisma returns null first)
        const messageIndex = data.findIndex((chat) => chat.latestMessage);
        return messageIndex > 0
            ? [...data.slice(messageIndex), ...data.slice(0, messageIndex)]
            : data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve chats');
    }
};

const getChat = async (chatId, userId) => {
    // Verify userId has permission to retrieve chat
    try {
        const chat = await prisma.chat.findFirst({
            select: {
                id: true,
                name: true,
                messages: {
                    select: {
                        id: true,
                        content: true,
                        sendTime: true,
                        senderId: true,
                    },
                    orderBy: {
                        sendTime: 'asc',
                    },
                },
                users: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
            where: {
                id: chatId,
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
        });
        if (!chat) throw new Error('404');
        return chat;
    } catch (error) {
        if (error.message == '404') {
            throw new DatabaseError('Unable to retrieve chat', 404);
        }
        throw new DatabaseError('Unable to retrieve chat');
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

const createChat = async (name, userIdArray, avatar) => {
    try {
        const sortedIds = userIdArray.sort();
        const signature = sortedIds.join(':');
        const userIdObjectArray = sortedIds.map((id) => ({ id }));
        const chat = await prisma.chat.create({
            data: {
                name,
                avatar,
                signature,
                users: {
                    connect: userIdObjectArray,
                },
            },
            include: {
                users: {
                    select: {
                        id: true,
                        username: true,
                    },
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
                    select: {
                        id: true,
                        username: true,
                    },
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

export {
    getChats,
    getChat,
    getChatBySignature,
    createChat,
    updateChatName,
    deleteChat,
};
