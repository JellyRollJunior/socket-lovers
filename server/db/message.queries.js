import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

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
                            }
                        }
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

const createMessage = async (chatId, senderId, content) => {
    try {
        const message = await prisma.message.create({
            data: {
                content,
                senderId,
                chatId,
            },
        });
        return message;
    } catch (error) {
        throw new DatabaseError('Unable to create message');
    }
};

export { getChat, createMessage };
