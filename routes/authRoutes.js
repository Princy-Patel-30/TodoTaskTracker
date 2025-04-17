import express from 'express';
import { signup, login,refreshAccessToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/refresh-token', refreshAccessToken);

export default router;
