import * as chatQueries from '../db/chat.queries.js';

const ensurePublicChatsExist = async (userId) => {
    let chats = await chatQueries.getPublicChats();
    if (!chats || chats.length == 0) {
        chats = await Promise.all([
            await chatQueries.createChat('Public Chat 1', [userId], true),
            await chatQueries.createChat('Public Chat 2', [userId], true),
        ]);
    }
    return chats;
};

const addToPublicChats = async (userId) => {
    const publicChats = ensurePublicChatsExist(userId);
    const updatedChats = await Promise.all(
        publicChats.map((chat) => {
            return chatQueries.updateChatUsers(chat.id, userId);
        })
    );
    return updatedChats;
};

export { addToPublicChats };
