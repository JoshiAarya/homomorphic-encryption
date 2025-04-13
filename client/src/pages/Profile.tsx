import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PredictionHistory } from '../types/prediction';
import { getPredictionHistory } from '../services/predictionService';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string;
}

const Profile = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [predictions, setPredictions] = useState<PredictionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, predictionsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/profile', {
            withCredentials: true,
          }),
          getPredictionHistory(authUser?._id || '')
        ]);
        
        setUser(profileRes.data.user);
        setPredictions(predictionsRes);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    if (authUser?._id) {
    fetchProfile();
    }
  }, [authUser?._id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 mt-10 p-4 bg-red-50 rounded-lg max-w-md mx-auto">
      {error}
    </div>
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAverage = (field: keyof PredictionHistory) => {
    if (predictions.length === 0) return '0';
    const sum = predictions.reduce((acc, pred) => {
      const value = pred[field];
      return acc + (typeof value === 'number' ? value : 0);
    }, 0);
    return (sum / predictions.length).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-blue-600">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500">
                Member since {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('predictions')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'predictions'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Performance History
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800">Account Type</h3>
                    <p className="text-2xl font-bold text-blue-600">{user?.role || 'Student'}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800">Last Login</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {user?.lastLogin ? formatDate(user.lastLogin) : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800">Total Predictions</h3>
                    <p className="text-2xl font-bold text-purple-600">{predictions.length}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Performance Averages</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">CGPA</p>
                      <p className="text-lg font-semibold">{calculateAverage('cgpa')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">LeetCode Score</p>
                      <p className="text-lg font-semibold">{calculateAverage('leetcodeScore')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Resume Score</p>
                      <p className="text-lg font-semibold">{calculateAverage('resumeScore')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Communication</p>
                      <p className="text-lg font-semibold">{calculateAverage('communicationSkills')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'predictions' && (
              <div className="space-y-4">
                {predictions.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No prediction history available</p>
                ) : (
                  predictions.map((prediction) => (
                    <div key={prediction._id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">
                          Prediction from {formatDate(prediction.createdAt)}
                        </h4>
                        <span className="text-lg font-bold text-blue-600">
                          ₹{prediction.predictedSalary.toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">CGPA</p>
                          <p>{prediction.cgpa}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">LeetCode</p>
                          <p>{prediction.leetcodeScore}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Projects</p>
                          <p>{prediction.projects}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Percentile</p>
                          <p>{prediction.percentile}%</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Account Settings</h3>
                  <p className="text-yellow-700">Coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
