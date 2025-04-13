import React from 'react';
import PredictionForm from '../components/PredictionForm';

const PredictionPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Student Performance Dashboard</h1>
                <PredictionForm />
            </div>
        </div>
    );
};

export default PredictionPage; 