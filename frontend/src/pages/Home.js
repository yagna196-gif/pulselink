import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="home">
      <h1>🩸 Welcome to Pulselink</h1>
      <p>Emergency Blood Donation Management System</p>
      <div className="cta-buttons">
        <Link to="/register-donor" className="btn btn-primary">
          Register as Donor
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
      </div>
      <div className="features">
        <h2>How it Works</h2>
        <div className="feature">
          <h3>For Donors</h3>
          <ul>
            <li>Register once with your blood group</li>
            <li>Receive SMS when blood is needed</li>
            <li>Accept or decline requests instantly</li>
            <li>Track your donation history</li>
          </ul>
        </div>
        <div className="feature">
          <h3>For Patients/Hospitals</h3>
          <ul>
            <li>Create urgent blood requests</li>
            <li>Instant SMS broadcast to matching donors</li>
            <li>Get rapid donor responses</li>
            <li>Complete donation tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
