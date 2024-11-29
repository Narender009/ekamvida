import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams(); // Capture the reset token from the URL
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation to check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Clear previous messages and errors
    setError('');
    setMessage('');

    // Mock API call (replace with your actual API call using Axios or fetch)
    axios.post('http://localhost:5000/api/reset-password', { token, password: formData.password })
      .then(response => {
        setMessage('Password has been reset successfully');
        // Redirect to login page after successful reset
        setTimeout(() => navigate('/login'), 3000);
      })
      .catch(error => {
        setError('Failed to reset password. Please try again.');
      });

    console.log('Password reset with token:', token, 'and new password:', formData.password);
    setMessage('Password has been reset successfully. Redirecting to login...');
    setTimeout(() => navigate('/LoginPage'), 3000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
