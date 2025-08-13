import * as publicChatQueries from '../db/publicChat.queries.js';

const ensurePublicChatsExist = async () => {
    let chats = await publicChatQueries.getPublicChats();
    if (!chats || chats.length == 0) {
        chats = await Promise.all([
            await publicChatQueries.createPublicChat('Public Chat 1'),
            await publicChatQueries.createPublicChat('Public Chat 2'),
        ]);
    }
    return chats;
};

export { ensurePublicChatsExist };
