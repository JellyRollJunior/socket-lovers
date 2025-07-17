import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import * as chatController from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.get('/', authenticateToken, chatController.getChats);
chatRouter.post('/', authenticateToken, chatController.createChat);

export { chatRouter };
