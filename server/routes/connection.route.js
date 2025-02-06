import express from 'express';
import { sendConnection, reviewConnection } from '../controllers/connection.controller';
import { checkAuth } from '../middlewares/user.middleware';

const connectionRouter = express.Router();

connectionRouter.post('/connections/send/:status/:userId', checkAuth, sendConnection);
connectionRouter.post('/connections/review/:status/:userId', checkAuth, reviewConnection);

export default connectionRouter;
