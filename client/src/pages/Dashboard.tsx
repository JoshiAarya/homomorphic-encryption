import React from 'react';
import FeatureFeedbackTable from '../components/FeatureFeedbackTable'; // Adjust path as needed

const mockPrediction = 8.2; // LPA

const mockFeedbackData = [
    { feature: 'CGPA', userValue: 7.8, ideal: '8.5+', impact: 'High' as const, suggestion: 'Aim for CGPA above 8.5' },
    { feature: 'Leetcode Score', userValue: 300, ideal: '500+', impact: 'Medium' as const, suggestion: 'Practice more DSA problems' },
    { feature: 'AMCAT Score', userValue: 400, ideal: '600+', impact: 'Low' as const, suggestion: 'Consider improving aptitude skills' },
    { feature: 'Internships', userValue: 1, ideal: '2+', impact: 'Medium' as const, suggestion: 'Try to gain another internship' },
    { feature: 'Resume Score', userValue: 60, ideal: '80+', impact: 'High' as const, suggestion: 'Polish your resume for better impact' },
  ];
  

const Dashboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Prediction Dashboard</h1>

      {/* Prediction Summary */}
      <div className="bg-indigo-100 text-indigo-800 rounded-xl p-6 mb-8 shadow">
        <h2 className="text-xl font-semibold">Estimated Salary</h2>
        <p className="text-3xl mt-2 font-bold">₹{mockPrediction} LPA</p>
        <p className="text-sm text-gray-600 mt-1">Based on your current profile</p>
      </div>

      {/* Feedback Table */}
      <FeatureFeedbackTable feedbackData={mockFeedbackData} />
    </div>
  );
};

export default Dashboard;
