import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import * as userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', authenticateToken, userController.getAllUsers);

export { userRouter };
