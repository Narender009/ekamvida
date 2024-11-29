import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setError('');

    try {
      await axios.post('http://localhost:5000/api/register', formData);
      navigate('/LoginPage'); // Redirect to login page on success
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('User already exists');
      } else {
        setError('Failed to register. Please try again.');
      }
    }
  };

  return (
    <div className="register-container min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="register-card w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Icon Circle */}
        <div className="register-icon-circle mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
          <UserPlus className="register-icon w-8 h-8 text-indigo-600" />
        </div>

        {/* Header Text */}
        <h1 className="register-title text-2xl font-bold text-center text-gray-900 mb-2">
          Create Account
        </h1>
        <p className="register-subtitle text-center text-gray-600 mb-8">
          Join us today!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="register-form space-y-4">
          {/* Name Fields Row */}
          <div className="register-names-row grid grid-cols-2 gap-4">
            {/* First Name */}
            <div className="register-input-group space-y-2">
              <label className="register-label block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="register-input-wrapper relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="register-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-10"
                  required
                />
                <User className="register-field-icon w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Last Name */}
            <div className="register-input-group space-y-2">
              <label className="register-label block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="register-input-wrapper relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="register-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-10"
                  required
                />
                <User className="register-field-icon w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="register-input-group space-y-2">
            <label className="register-label block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="register-input-wrapper relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="register-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-10"
                required
              />
              <Mail className="register-field-icon w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Password */}
          <div className="register-input-group space-y-2">
            <label className="register-label block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="register-input-wrapper relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="register-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-10"
                required
              />
              <Lock className="register-field-icon w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="register-input-group space-y-2">
            <label className="register-label block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="register-input-wrapper relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="register-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-10"
                required
              />
              <Lock className="register-field-icon w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {error && (
            <div className="register-error text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="register-submit w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Create Account
          </button>
        </form>

        <div className="register-footer text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <a href="/LoginPage" className="register-link text-indigo-600 hover:text-indigo-700 font-medium">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;