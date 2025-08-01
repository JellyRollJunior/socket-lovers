import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import { retrieveAvatar } from '../middleware/multer.js';
import * as userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', authenticateToken, userController.getAllUsers);
userRouter.patch('/:userId', authenticateToken, userController.patchBio);
userRouter.patch(
    '/:userId/avatar',
    authenticateToken,
    retrieveAvatar,
    userController.patchAvatar
);

export { userRouter };
