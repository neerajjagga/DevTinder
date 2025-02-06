import express from 'express';
import {
    signUpUser,
    loginUser,
    logoutUser,
    refreshTokens,
} from '../controllers/auth.controller.js';
import { validateUserSchema } from '../validators/user.validator.js';

const authRouter = express.Router();

authRouter.post('/signup', validateUserSchema, signUpUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.post('/refresh-token', refreshTokens);

export default authRouter;
