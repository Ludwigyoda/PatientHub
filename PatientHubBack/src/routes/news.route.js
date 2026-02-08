import express from 'express';
import NewsController from '../controllers/news.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, NewsController.getRegionalNews);

export default router;
