import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Job Insights</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Student Form</Link>
        <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
