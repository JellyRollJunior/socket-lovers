import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const createMessage = async (chatId, senderId, content) => {
    try {
        const message = await prisma.message.create({
            data: {
                chatId,
                senderId,
                content,
                latestMessage: {
                    connect: {
                        id: chatId,
                    },
                },
            },
        });
        return message;
    } catch (error) {
        throw new DatabaseError('Unable to create message');
    }
};

export { createMessage };
