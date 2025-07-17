import * as chatQueries from '../db/chat.queries.js';

const getChats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const chats = await chatQueries.getChats(userId);
        res.json({ chats });
    } catch (error) {
        next(error);
    }
};

const createChat = async (req, res, next) => {
    try {
        const userIdArray = [...req.body.userIds, req.user.id];
        const name = req.body.name;
        const chat = await chatQueries.createChat(name, userIdArray);
        res.json(chat);
    } catch (error) {
        next(error);
    }
};

export { getChats, createChat };
