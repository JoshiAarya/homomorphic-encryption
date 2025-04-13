import { Request, Response } from 'express';
import Prediction, { IPrediction } from '../models/Prediction';

// Simple linear regression model for salary prediction
const predictSalary = (data: any): number => {
    // Weights for different factors
    const weights = {
        cgpa: 50000,
        leetcodeScore: 200,
        amcatELQ: 100,
        amcatAutomata: 100,
        internships: 10000,
        projects: 5000,
        resumeScore: 300,
        communicationSkills: 300
    };

    // Base salary
    let salary = 300000;

    // Calculate weighted sum
    salary += data.cgpa * weights.cgpa;
    salary += data.leetcodeScore * weights.leetcodeScore;
    salary += data.amcatELQ * weights.amcatELQ;
    salary += data.amcatAutomata * weights.amcatAutomata;
    salary += data.internships * weights.internships;
    salary += data.projects * weights.projects;
    salary += data.resumeScore * weights.resumeScore;
    salary += data.communicationSkills * weights.communicationSkills;

    return Math.round(salary);
};

const generateFeedback = (data: any) => {
    return {
        cgpa: data.cgpa >= 8.5 
            ? "Your CGPA is excellent for placements!" 
            : "Consider improving your CGPA to 8.5+ for better placement opportunities.",
        leetcode: data.leetcodeScore >= 500 
            ? "Outstanding LeetCode performance!" 
            : data.leetcodeScore >= 250 
                ? "Good LeetCode score, but aim for 500+ for top companies" 
                : "Consider practicing more on LeetCode to improve your problem-solving skills",
        amcat: data.amcatELQ >= 65 && data.amcatAutomata >= 65
            ? "Great AMCAT scores! You meet the eligibility criteria"
            : "Work on improving your AMCAT scores to meet the 65+ threshold",
        internships: data.internships > 0
            ? "Good job on having internship experience"
            : "Consider applying for internships to gain practical experience",
        projects: data.projects >= 3
            ? "Excellent number of projects!"
            : "Try to complete at least 3 substantial projects",
        resume: data.resumeScore >= 90
            ? "Outstanding resume!"
            : data.resumeScore >= 80
                ? "Good resume, but there's room for improvement"
                : "Consider getting your resume reviewed and improved",
        communication: data.communicationSkills >= 90
            ? "Excellent communication skills!"
            : data.communicationSkills >= 80
                ? "Good communication skills, keep practicing"
                : "Work on improving your communication skills through practice and feedback"
    };
};

const calculatePercentile = async (predictedSalary: number): Promise<number> => {
    // In a real application, this would query historical data
    // For now, we'll use a simple mock percentile calculation
    const mockPercentiles = [200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000];
    const lowerSalaries = mockPercentiles.filter(salary => salary < predictedSalary).length;
    return Math.round((lowerSalaries / mockPercentiles.length) * 100);
};

export const createPrediction = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        
        // Validate required fields
        const requiredFields = ['userId', 'cgpa', 'leetcodeScore', 'amcatELQ', 'amcatAutomata', 
                              'internships', 'projects', 'resumeScore', 'communicationSkills'];
        
        for (const field of requiredFields) {
            if (!data[field]) {
                res.status(400).json({ error: `Missing required field: ${field}` });
                return;
            }
        }

        const predictedSalary = predictSalary(data);
        const percentile = await calculatePercentile(predictedSalary);
        const feedback = generateFeedback(data);

        const prediction = new Prediction({
            ...data,
            predictedSalary,
            percentile,
            feedback
        });

        await prediction.save();

        res.status(201).json({
            predictedSalary,
            percentile,
            feedback
        });
    } catch (error) {
        console.error('Error creating prediction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPredictionHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const predictions = await Prediction.find({ userId })
            .sort({ createdAt: -1 })
            .limit(10);
        
        res.json(predictions);
    } catch (error) {
        console.error('Error fetching prediction history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}; 