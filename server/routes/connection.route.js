import express from 'express';
import { sendConnection, reviewConnection, getMyConnections, getReceivedConnections } from '../controllers/connection.controller.js';
import { checkAuth } from '../middlewares/user.middleware.js';

const connectionRouter = express.Router();

connectionRouter.get('/me', checkAuth, getMyConnections);
connectionRouter.get('/received', checkAuth, getReceivedConnections);
connectionRouter.post('/send/:status/:toUserId', checkAuth, sendConnection);
connectionRouter.post('/review/:status/:requestId', checkAuth, reviewConnection);

export default connectionRouter;
