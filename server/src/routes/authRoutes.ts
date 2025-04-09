import express from 'express';
// routes/authRoutes.ts
import { signup, login, getProfile, logout } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected route
router.get('/profile', authMiddleware, getProfile);

export default router;
