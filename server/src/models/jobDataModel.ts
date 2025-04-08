import mongoose from 'mongoose';

const jobDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  cgpa: Number,
  leetcode: Number,
  amcat: Number,
  salary: Number,
}, { timestamps: true });

export default mongoose.model('JobData', jobDataSchema);
