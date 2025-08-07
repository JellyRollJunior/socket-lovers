import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/authRouter.js';
import { userRouter } from './routes/userRouter.js';
import { chatRouter } from './routes/chatRouter.js';
import { currentRouter } from './routes/currentRouter.js';
import { error404Handler, errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/current', currentRouter);
app.use('/users', userRouter);
app.use('/chats', chatRouter);

// errors
app.use(/(.*)/, error404Handler);
app.use(errorHandler);

export { app };
