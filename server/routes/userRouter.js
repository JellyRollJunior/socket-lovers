import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import * as userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', authenticateToken, userController.getAllUsers);
userRouter.patch('/:userId', authenticateToken, userController.patchUser)

export { userRouter };
