import { Request, Response } from 'express';
import JobData from '../models/jobDataModel';

export const submitJobData = async (req: Request, res: Response) => {
  try {
    const newEntry = new JobData(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Job data submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save job data' });
  }
};

export const getAllJobData = async (_req: Request, res: Response) => {
  try {
    const data = await JobData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
