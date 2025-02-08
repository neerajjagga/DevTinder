import express from 'express';
import { sendConnection, reviewConnection } from '../controllers/connection.controller.js';
import { checkAuth } from '../middlewares/user.middleware.js';

const connectionRouter = express.Router();

connectionRouter.post('/send/:status/:toUserId', checkAuth, sendConnection);
connectionRouter.post('/review/:status/:toUserId', checkAuth, reviewConnection);

export default connectionRouter;
