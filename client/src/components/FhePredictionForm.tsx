import { useState } from "react";
import axios from "axios";

const FhePredictionForm = () => {
  const [formData, setFormData] = useState({
    cgpa: "",
    leetcodeScore: "",
    amcatScore: "",
    internships: "",
    projects: "",
    github_repos: "",
    resume_score: "",
    communication_skills: "",
    college_tier: ""
  });

  const [loading, setLoading] = useState(false);
  const [salary, setSalary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSalary(null);

    try {
      // Convert form fields to an array of numbers.
      // This assumes that the order in the array is the same as the backend expects.
      const userData = Object.values(formData).map(value => parseFloat(value));

      // Send the converted array directly to your FastAPI endpoint.
      const response = await axios.post(
        "http://localhost:8010/sendandgetprediction",
        { input: userData },
        { headers: { "Content-Type": "application/json" } }
      );

      // Format salary as a fixed decimal string.
      setSalary(response.data.salary.toFixed(2) + " LPA");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Predict Your Salary (FHE)</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <input
            key={key}
            name={key}
            type="number"
            value={value}
            onChange={handleChange}
            placeholder={key.replace(/_/g, " ")}
            className="border p-2 rounded-md"
            required
          />
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {salary && (
        <p className="mt-4 text-green-700 font-medium">
          🔐 Predicted Salary: {salary}
        </p>
      )}
      {error && (
        <p className="mt-4 text-red-600 font-medium">⚠️ {error}</p>
      )}
    </div>
  );
};

export default FhePredictionForm;
