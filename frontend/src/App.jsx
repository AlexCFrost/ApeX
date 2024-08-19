import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import Dashboard from './Pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="flex justify-center items-center min-h-screen bg-black">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;