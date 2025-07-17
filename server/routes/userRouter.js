import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

export { userRouter };
