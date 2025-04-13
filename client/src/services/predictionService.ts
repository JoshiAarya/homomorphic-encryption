import axios from 'axios';
import { PredictionFormData, PredictionResponse, PredictionHistory } from '../types/prediction';

const API_URL = 'http://localhost:5000/api/prediction';

export const createPrediction = async (data: PredictionFormData): Promise<PredictionResponse> => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error creating prediction:', error);
        throw error;
    }
};

export const getPredictionHistory = async (userId: string): Promise<PredictionHistory[]> => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching prediction history:', error);
        throw error;
    }
}; 