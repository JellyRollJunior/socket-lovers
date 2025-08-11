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
        if (error.code == 'P2025') {
            // P2025: An operation failed because it depends on one or more records that were required but not found
            throw new DatabaseError('Unable to create message', 404);
        }
        throw new DatabaseError('Unable to create message');
    }
};

export { createMessage };
