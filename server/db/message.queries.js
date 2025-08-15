import { PrismaClient, CHAT_TYPE } from '@prisma/client';
import { USERS_INCLUDE } from './returnDataPresets.js';
import { DatabaseError } from '../errors/DatabaseError.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';

const prisma = new PrismaClient();

const getChatMessages = async (chatId) => {
    try {
        const data = await prisma.chat.findFirst({
            include: {
                signature: false,
                latestMessageId: false,
                latestMessage: false,
                messages: {
                    select: {
                        id: true,
                        content: true,
                        sendTime: true,
                        senderId: true,
                        sender: {
                            select: {
                                username: true,
                                avatar: true,
                            },
                        },
                    },
                    orderBy: {
                        sendTime: 'asc',
                    },
                },
                users: {
                    include: USERS_INCLUDE,
                },
            },
            where: {
                id: chatId,
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve chat');
    }
};

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

export { getChatMessages, createMessage };
