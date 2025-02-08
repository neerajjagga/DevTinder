import express from 'express'
import { checkAuth } from '../middlewares/user.middleware.js';
import { getFeed } from '../controllers/feed.controller.js';

const feedRouter = express.Router();

feedRouter.get('/', checkAuth, getFeed);

export default feedRouter