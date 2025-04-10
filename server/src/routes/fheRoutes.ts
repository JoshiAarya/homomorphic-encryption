// routes/fheRoutes.ts
import express from 'express';
import { sendUserData, fetchPrediction } from '../controllers/fheClientController';

const router = express.Router();

router.post('/submit', sendUserData);
router.get('/fetch', fetchPrediction);

export default router;
