import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
const app = express();

import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import feedRouter from './routes/feed.route.js';
import connectionRouter from './routes/connection.route.js';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}))

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/feed', feedRouter);
app.use('/api/connections', connectionRouter);

app.listen(3000, async () => {
    console.log("Server is listening on port 3000");
    await connectDB();
});
