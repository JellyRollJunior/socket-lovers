import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import * as chatQueries from './chat.queries.js';

const prisma = new PrismaClient();

const createMessage = async (chatId, senderId, content) => {
    try {
        // getChat checks if user is authorized to access chat
        const chat = await chatQueries.getChat(chatId, senderId);
        if (!chat) throw new Error('403');
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
        if (error.message == '403') {
            throw new AuthorizationError('User is not authorized to view this resource');
        }
        if (error.code == 'P2025') {
            // P2025: An operation failed because it depends on one or more records that were required but not found
            throw new DatabaseError('Unable to create message', 404);
        }
        throw new DatabaseError('Unable to create message');
    }
};

export { createMessage };
