import mongoose, { Schema, Document } from 'mongoose';

export interface IPrediction extends Document {
    userId: string;
    cgpa: number;
    leetcodeScore: number;
    amcatELQ: number;
    amcatAutomata: number;
    internships: number;
    projects: number;
    resumeScore: number;
    communicationSkills: number;
    predictedSalary: number;
    percentile: number;
    feedback: {
        cgpa: string;
        leetcode: string;
        amcat: string;
        internships: string;
        projects: string;
        resume: string;
        communication: string;
    };
    createdAt: Date;
}

const PredictionSchema: Schema = new Schema({
    userId: { type: String, required: true },
    cgpa: { type: Number, required: true, min: 0, max: 10 },
    leetcodeScore: { type: Number, required: true, min: 0 },
    amcatELQ: { type: Number, required: true, min: 0, max: 100 },
    amcatAutomata: { type: Number, required: true, min: 0, max: 100 },
    internships: { type: Number, required: true, min: 0 },
    projects: { type: Number, required: true, min: 0 },
    resumeScore: { type: Number, required: true, min: 0, max: 100 },
    communicationSkills: { type: Number, required: true, min: 0, max: 100 },
    predictedSalary: { type: Number, required: true },
    percentile: { type: Number, required: true },
    feedback: {
        cgpa: { type: String, required: true },
        leetcode: { type: String, required: true },
        amcat: { type: String, required: true },
        internships: { type: String, required: true },
        projects: { type: String, required: true },
        resume: { type: String, required: true },
        communication: { type: String, required: true }
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPrediction>('Prediction', PredictionSchema); 