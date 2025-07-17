import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/authRouter.js';
import { userRouter } from './routes/userRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/users', userRouter);

export { app };
