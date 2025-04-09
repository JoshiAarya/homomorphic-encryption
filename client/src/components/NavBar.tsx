import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout'); // Optional: implement on backend to clear cookie
    } catch (err) {
      // Silent fail
    }
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold tracking-wide">
          Job Insights
        </Link>
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:underline">Student Form</Link>
          <Link to="/admin" className="hover:underline">Admin Dashboard</Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:underline">
                {user.name.split(' ')[0]}'s Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
