import React, { useState } from 'react';
import { PredictionFormData, PredictionResponse } from '../types/prediction';
import { createPrediction } from '../services/predictionService';

const PredictionForm: React.FC = () => {
    const [formData, setFormData] = useState<PredictionFormData>({
        userId: 'user123', // This should come from auth context in a real app
        cgpa: 0,
        leetcodeScore: 0,
        amcatELQ: 0,
        amcatAutomata: 0,
        internships: 0,
        projects: 0,
        resumeScore: 0,
        communicationSkills: 0
    });

    const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await createPrediction(formData);
            setPrediction(result);
        } catch (err) {
            setError('Failed to create prediction. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Student Performance Prediction</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">CGPA (0-10)</label>
                        <input
                            type="number"
                            name="cgpa"
                            value={formData.cgpa}
                            onChange={handleChange}
                            min="0"
                            max="10"
                            step="0.1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">LeetCode Score</label>
                        <input
                            type="number"
                            name="leetcodeScore"
                            value={formData.leetcodeScore}
                            onChange={handleChange}
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">AMCAT ELQ Score (0-100)</label>
                        <input
                            type="number"
                            name="amcatELQ"
                            value={formData.amcatELQ}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">AMCAT Automata Score (0-100)</label>
                        <input
                            type="number"
                            name="amcatAutomata"
                            value={formData.amcatAutomata}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Number of Internships</label>
                        <input
                            type="number"
                            name="internships"
                            value={formData.internships}
                            onChange={handleChange}
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Number of Projects</label>
                        <input
                            type="number"
                            name="projects"
                            value={formData.projects}
                            onChange={handleChange}
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Resume Score (0-100)</label>
                        <input
                            type="number"
                            name="resumeScore"
                            value={formData.resumeScore}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Communication Skills (0-100)</label>
                        <input
                            type="number"
                            name="communicationSkills"
                            value={formData.communicationSkills}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Get Prediction'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {prediction && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Prediction Results</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-lg">
                            <span className="font-semibold">Predicted Salary:</span>{' '}
                            ₹{prediction.predictedSalary.toLocaleString()}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold">Percentile:</span>{' '}
                            {prediction.percentile}%
                        </p>
                    </div>

                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3">Feedback</h4>
                        <div className="space-y-2">
                            {Object.entries(prediction.feedback).map(([key, value]) => (
                                <div key={key} className="bg-white p-3 rounded-md shadow-sm">
                                    <p className="font-medium capitalize">{key}:</p>
                                    <p className="text-gray-600">{value as string}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PredictionForm; 