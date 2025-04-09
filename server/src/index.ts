import express from 'express';
import cors from 'cors'; // ← Add this
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser()); 

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true  
}));

app.use(express.json());


import jobDataRoutes from './routes/jobDataRoutes';
app.use('/api/jobdata', jobDataRoutes);

import authRoutes from './routes/authRoutes';
app.use('/api/auth', authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
