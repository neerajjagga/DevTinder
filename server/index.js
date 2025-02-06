import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
const app = express();

import userRouter from './routes/auth.route.js';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}))

app.use('/api/auth', userRouter);

app.listen(3000, async () => {
    console.log("Server is listening on port 3000");
    await connectDB();
});
