import express from 'express';
import cors from 'cors'; // ← Add this
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import jobDataRoutes from './routes/jobDataRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/jobdata', jobDataRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
