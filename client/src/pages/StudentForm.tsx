import { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    leetcode: '',
    amcat: '',
    cgpa: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await axios.post('http://localhost:5000/api/jobdata/submit', formData);
      setStatus('Successfully submitted!');
      setFormData({ name: '', salary: '', leetcode: '', amcat: '', cgpa: '' });
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Submit Job Data</h2>

      {status && (
        <div className={`mb-4 p-2 rounded ${status.startsWith('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'salary', 'leetcode', 'amcat', 'cgpa'].map((field) => (
          <div key={field}>
            <label className="block capitalize mb-1">{field}</label>
            <input
              type={field === 'name' ? 'text' : 'number'}
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
