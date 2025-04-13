import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import StudentForm from './pages/StudentForm';
import AdminDashboard from './pages/AdminDashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import FhePredictionForm from './components/FhePredictionForm';
import Dashboard from './pages/Dashboard';
import PredictionPage from './pages/PredictionPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/predict" element={<FhePredictionForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/performance" element={<PredictionPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
