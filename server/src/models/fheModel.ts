import mongoose from 'mongoose';

const fheModelSchema = new mongoose.Schema({
  cgpa: Number,
  leetcodeScore: Number,
  amcatScore: Number,
  internships: Number,
  projects: Number,
  github_repos: Number,
  resume_score: Number,
  communication_skills: Number, 
  college_tier: Number

}, { timestamps: true });

export const fheModelSchemas = mongoose.model('FheModelSchema', fheModelSchema);
