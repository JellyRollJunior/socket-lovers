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
                            }
                        }
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
        if (!data) throw new Error('404');
        return data;
    } catch (error) {
        if (error.message == '404') {
            throw new DatabaseError('Unable to retrieve chat', 404);
        }
        throw new DatabaseError('Unable to retrieve chat');
    }
};

const createMessage = async (chatId, senderId, content) => {
    try {
        // getChat checks if user is authorized to access chat
        const chat = await getChatMessages(chatId, senderId);
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

export { getChatMessages, createMessage };
