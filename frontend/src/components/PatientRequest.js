import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { requestService } from '../services';

export const PatientRequest = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    bloodGroup: 'O+',
    quantityNeeded: 1,
    priority: 'NORMAL',
    hospitalName: '',
    hospitalAddress: '',
    hospitalPhone: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await requestService.createRequest(formData);
      setMessage(result.message);
      setFormData({
        bloodGroup: 'O+',
        quantityNeeded: 1,
        priority: 'NORMAL',
        hospitalName: '',
        hospitalAddress: '',
        hospitalPhone: '',
        notes: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Request creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-request">
      <h1>🩸 Request Blood</h1>
      <form onSubmit={handleSubmit}>
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          type="number"
          name="quantityNeeded"
          placeholder="Quantity (units)"
          value={formData.quantityNeeded}
          onChange={handleChange}
          min="1"
          required
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
        >
          <option value="NORMAL">Normal</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>

        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          value={formData.hospitalName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="hospitalAddress"
          placeholder="Hospital Address"
          value={formData.hospitalAddress}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="hospitalPhone"
          placeholder="Hospital Phone"
          value={formData.hospitalPhone}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Additional notes"
          value={formData.notes}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Request...' : 'Request Blood'}
        </button>
      </form>
    </div>
  );
};
