import express from 'express';
import { createComment, getCommentsByTask } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createComment);
router.get('/:taskId', protect, getCommentsByTask);

export default router;
