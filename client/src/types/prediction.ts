export interface PredictionFormData {
    userId: string;
    cgpa: number;
    leetcodeScore: number;
    amcatELQ: number;
    amcatAutomata: number;
    internships: number;
    projects: number;
    resumeScore: number;
    communicationSkills: number;
}

export interface PredictionFeedback {
    cgpa: string;
    leetcode: string;
    amcat: string;
    internships: string;
    projects: string;
    resume: string;
    communication: string;
}

export interface PredictionResponse {
    predictedSalary: number;
    percentile: number;
    feedback: PredictionFeedback;
}

export interface PredictionHistory {
    _id: string;
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
    feedback: PredictionFeedback;
    createdAt: string;
} 