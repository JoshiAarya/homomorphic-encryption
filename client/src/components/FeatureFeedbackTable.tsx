import React from 'react';

type FeatureFeedback = {
  feature: string;
  userValue: number | string;
  ideal: string;
  impact: 'High' | 'Medium' | 'Low';
  suggestion: string;
};

interface Props {
  feedbackData: FeatureFeedback[];
}

const impactColor = {
  High: 'text-red-600',
  Medium: 'text-yellow-600',
  Low: 'text-green-600',
};

const FeatureFeedbackTable: React.FC<Props> = ({ feedbackData }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-2xl mt-6">
      <table className="min-w-full text-sm text-left bg-white rounded-lg border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-4">Feature</th>
            <th className="px-6 py-4">Your Value</th>
            <th className="px-6 py-4">Ideal</th>
            <th className="px-6 py-4">Impact</th>
            <th className="px-6 py-4">Suggestion</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((row, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-6 py-4 font-medium text-gray-800">{row.feature}</td>
              <td className="px-6 py-4">{row.userValue}</td>
              <td className="px-6 py-4">{row.ideal}</td>
              <td className={`px-6 py-4 font-bold ${impactColor[row.impact]}`}>{row.impact}</td>
              <td className="px-6 py-4 text-gray-700">{row.suggestion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureFeedbackTable;
