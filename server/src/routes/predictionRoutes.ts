import express from 'express';
import { createPrediction, getPredictionHistory } from '../controllers/predictionController';

const router = express.Router();

// Create a new prediction
router.post('/', createPrediction);

// Get prediction history for a user
router.get('/:userId', getPredictionHistory);

export default router; 