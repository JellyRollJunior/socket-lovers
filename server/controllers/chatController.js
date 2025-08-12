import dotenv from 'dotenv';
import { validateInput } from '../middleware/validations.js';
import * as chatQueries from '../db/chat.queries.js';
dotenv.config();

const getChats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const chats = await chatQueries.getChats(userId);
        res.json({ chats });
    } catch (error) {
        next(error);
    }
};

const getChat = async (req, res, next) => {
    try {
        validateInput(req);
        const { chatId } = req.params;
        const chat = await chatQueries.getChat(chatId, req.user.id);
        res.json(chat);
    } catch (error) {
        next(error);
    }
};

const createChat = async (req, res, next) => {
    try {
        validateInput(req);
        const userIdArray = [...req.body.userIds, req.user.id];
        // if chat exists, return existing chat
        const existingChat = await chatQueries.getChatBySignature(userIdArray);
        if (existingChat) return res.json(existingChat);
        const name = req.body.name ? req.body.name : null;
        // if groupchat, set default group chat avatar
        const avatar =
            userIdArray.length > 2
                ? process.env.SUPABASE_DEFAULT_GROUP_CHAT_AVATAR
                : null;
        const chat = await chatQueries.createChat(name, userIdArray, avatar);
        res.json(chat);
    } catch (error) {
        next(error);
    }
};

const updateChatName = async (req, res, next) => {
    try {
        validateInput(req);
        const { chatId } = req.params;
        const name = req.body.name ? req.body.name : null;
        const chat = await chatQueries.updateChatName(
            chatId,
            name,
            req.user.id
        );
        res.json(chat);
    } catch (error) {
        next(error);
    }
};

const deleteChat = async (req, res, next) => {
    try {
        validateInput(req);
        const { chatId } = req.params;
        const chat = await chatQueries.deleteChat(chatId, req.user.id);
        res.json(chat);
    } catch (error) {
        next(error);
    }
};

export { getChats, getChat, createChat, updateChatName, deleteChat };
