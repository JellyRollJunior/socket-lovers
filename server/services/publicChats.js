import * as chatQueries from '../db/chat.queries.js';

const ensurePublicChatsExist = async () => {
    let chats = await chatQueries.getPublicChats();
    if (!chats || chats.length == 0) {
        chats = await Promise.all([
            await chatQueries.createPublicChat('Public Chat 1'),
            await chatQueries.createPublicChat('Public Chat 2'),
        ]);
    }
    return chats;
};

const addToPublicChats = async (userId) => {
    const publicChats = await ensurePublicChatsExist();
    const updatedChats = await Promise.all(
        publicChats.map((chat) => {
            return chatQueries.updateChatUsers(chat.id, userId);
        })
    );
    return updatedChats;
};

export { addToPublicChats };
