import { useEffect, useState } from 'react';
import axios from 'axios';

interface JobData {
  _id: string;
  name: string;
  salary: number;
  leetcode: number;
  amcat: number;
  cgpa: number;
}

const AdminDashboard = () => {
  const [data, setData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobdata/all');
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch job data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {loading ? (
        <p>Loading data...</p>
      ) : data.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Salary</th>
                <th className="py-2 px-4 border-b">Leetcode</th>
                <th className="py-2 px-4 border-b">AMCAT</th>
                <th className="py-2 px-4 border-b">CGPA</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr key={entry._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{entry.name}</td>
                  <td className="py-2 px-4 border-b">{entry.salary}</td>
                  <td className="py-2 px-4 border-b">{entry.leetcode}</td>
                  <td className="py-2 px-4 border-b">{entry.amcat}</td>
                  <td className="py-2 px-4 border-b">{entry.cgpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
