import express from 'express';
import {
    getUserProfile,
} from '../controllers/user.controller.js';
import { checkAuth } from '../middlewares/user.middleware.js';

const userRouter = express.Router();

userRouter.get('/profile', checkAuth, getUserProfile);

export default userRouter;
