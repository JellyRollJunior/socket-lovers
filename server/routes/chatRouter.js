import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import * as chatController from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.post('/', authenticateToken, chatController.createChat);

export { chatRouter };
