import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getMessages = async (chatId) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                chatId,
            },
            select: {
                id: true,
                content: true,
                sendTime: true,
                chatId: true,
                sender: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
        });
        return messages;
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

export { getMessages, createMessage };
