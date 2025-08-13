import * as publicChatQueries from '../db/publicChat.queries.js';

const ensurePublicChatsExist = async () => {
    let chats = await chatQueries.getPublicChats();
    if (!chats || chats.length == 0) {
        chats = await Promise.all([
            await publicChatQueries.createPublicChat('Public Chat 1'),
            await publicChatQueries.createPublicChat('Public Chat 2'),
        ]);
    }
    return chats;
};

const addToPublicChats = async (userId) => {
    const publicChats = await ensurePublicChatsExist();
    const updatedChats = await Promise.all(
        publicChats.map((chat) => {
            return publicChatQueries.updateChatUsers(chat.id, userId);
        })
    );
    return updatedChats;
};

export { addToPublicChats };
