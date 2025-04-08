import { Router } from 'express';
import { submitJobData, getAllJobData } from '../controllers/jobDataController';

const router = Router();

router.post('/submit', submitJobData);
router.get('/all', getAllJobData);

export default router;
