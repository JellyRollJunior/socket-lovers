import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import { chatValidations, chatIdValidations } from '../middleware/validations.js';
import * as chatController from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.get('/', authenticateToken, chatController.getChats);
chatRouter.post('/', authenticateToken, chatValidations, chatController.createChat);
chatRouter.get('/:chatId', authenticateToken, chatIdValidations, chatController.getChat);

export { chatRouter };
