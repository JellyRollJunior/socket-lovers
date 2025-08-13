import { ensurePublicChatsExist } from '../services/publicChats.js';
import * as publicChatQueries from '../db/publicChat.queries.js';

const getPublicChats = async (req, res, next) => {
    try {
        ensurePublicChatsExist();
        const data = await publicChatQueries.getPublicChats();
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export { getPublicChats };
