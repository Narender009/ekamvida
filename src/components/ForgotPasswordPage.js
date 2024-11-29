import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous messages and errors
    setMessage('');
    setError('');

    // Mock API call (replace with your actual API call using Axios or fetch)
    axios.post('http://localhost:5000/api/forgot-password', { email })
      .then(response => {
        setMessage('A password reset link has been sent to your email');
      })
      .catch(error => {
        setError('Failed to send password reset email');
      });

    console.log('Password reset request sent for:', email);
    setMessage('If the email exists, a password reset link has been sent to it.');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit">Send Password Reset Link</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
