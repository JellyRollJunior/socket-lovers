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
            where: {
                id: chatId,
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
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
                                username: true,
                            },
                        },
                    },
                    orderBy: {
                        sendTime: 'asc',
                    },
                },
            },
        });
        if (!chat) throw new Error();
        return chat;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve messages');
    }
};

const createChat = async (name, userIdArray) => {
    try {
        const userIdObjectArray = userIdArray.map((id) => ({ id }));
        const chat = await prisma.chat.create({
            data: {
                name,
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

export { getChats, getChat, createChat };
