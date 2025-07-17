import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createChat = async (name, userIdArray) => {
    try {
        const userIdObjectArray = userIdArray.map((user) => ({ id: user.id }));
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

export { createChat };
