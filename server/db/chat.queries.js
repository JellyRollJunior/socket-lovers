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
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve chats');
    }
};

const getChat = async (chatId, userId) => {
    // Verify userId has permission to retrieve chat
    // Retrieve messages
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
                        sender: {
                            select: {
                                id: true,
                            },
                        },
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
        if (!chat) throw new Error();
        return chat;
    } catch (error) {
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

const createChat = async (name, userIdArray) => {
    try {
        const sortedIds = userIdArray.sort();
        const signature = sortedIds.join(':');
        const userIdObjectArray = sortedIds.map((id) => ({ id }));
        const chat = await prisma.chat.create({
            data: {
                name,
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

export { getChats, getChat, getChatBySignature, createChat };
