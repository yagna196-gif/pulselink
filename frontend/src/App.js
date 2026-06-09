import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { DonorRegistration } from './components/DonorRegistration';
import { DonorDashboard } from './pages/DonorDashboard';
import { PatientRequest } from './components/PatientRequest';
import './styles/app.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-donor" element={<DonorRegistration />} />
            <Route
              path="/donor-dashboard"
              element={
                <ProtectedRoute requiredRole="DONOR">
                  <DonorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient-request"
              element={
                <ProtectedRoute requiredRole="PATIENT">
                  <PatientRequest />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
