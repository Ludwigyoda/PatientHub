import express from 'express';
import ToolController from '../controllers/tool.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, ToolController.getAll);
router.get('/:id', authenticateToken, ToolController.getOne);
router.post('/', authenticateToken, ToolController.create);
router.put('/:id', authenticateToken, ToolController.update);
router.delete('/:id', authenticateToken, ToolController.remove);

export default router;