import React, { useState, useEffect } from 'react';
import { requestService } from '../services';

export const DonorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await requestService.getRequests({ status: 'SMS_SENT' });
        setRequests(data.requests || []);
      } catch (err) {
        setError('Failed to fetch requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      await requestService.respondToRequest(requestId, 'ACCEPTED');
      alert('Request accepted! Patient will contact you shortly.');
      setRequests(requests.filter((r) => r.id !== requestId));
    } catch (err) {
      alert('Failed to accept request');
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await requestService.respondToRequest(requestId, 'DECLINED', 'Not available');
      setRequests(requests.filter((r) => r.id !== requestId));
    } catch (err) {
      alert('Failed to decline request');
    }
  };

  if (loading) return <div>Loading requests...</div>;

  return (
    <div className="donor-dashboard">
      <h1>🩸 Blood Requests for You</h1>
      {error && <p className="error">{error}</p>}
      {requests.length === 0 ? (
        <p>No active blood requests at this time.</p>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <div key={request.id} className="request-card">
              <h3>Blood Group: {request.bloodGroup}</h3>
              <p><strong>Patient:</strong> {request.patient.name}</p>
              <p><strong>Location:</strong> {request.patient.address}</p>
              <p><strong>Priority:</strong> {request.priority}</p>
              <p><strong>Hospital:</strong> {request.hospitalName}</p>
              <p><strong>Quantity Needed:</strong> {request.quantityNeeded} units</p>
              <div className="actions">
                <button onClick={() => handleAccept(request.id)} className="accept">
                  Accept
                </button>
                <button onClick={() => handleDecline(request.id)} className="decline">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
