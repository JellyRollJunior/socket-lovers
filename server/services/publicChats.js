import * as publicChatQueries from '../db/publicChat.queries.js';

const seedPublicChats = async () => {
    let chats = await publicChatQueries.getPublicChats();
    if (!chats || chats.length == 0) {
        chats = await Promise.all([
            await publicChatQueries.createPublicChat('Public Chat 1'),
            await publicChatQueries.createPublicChat('Public Chat 2'),
        ]);
        console.log('Seeding public chats successful')
    }
    return chats;
};

export { seedPublicChats };
