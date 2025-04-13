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
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-200 transition-colors">
          Job Insights
        </Link>
        <div className="space-x-4 flex items-center text-sm font-medium">
          <Link to="/dashboard" className="hover:text-gray-200 transition-colors">
            Dashboard
          </Link>
          {/* <Link to="/admin" className="hover:text-gray-200 transition-colors">
            Admin Dashboard
          </Link> */}
          <Link to="/predict" className="hover:text-gray-200 transition-colors">
            Predict
          </Link>
          <Link to="/performance" className="hover:text-gray-200 transition-colors">
            Performance Analysis
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:text-gray-200 transition-colors">
                {user.name.split(' ')[0]}'s Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-200 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
