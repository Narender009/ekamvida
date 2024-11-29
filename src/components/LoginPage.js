// LoginPage.js
import React, { useState, useContext } from 'react';
import { ArrowRightToLine } from 'lucide-react';
import { Mail, Lock } from 'lucide-react';
import axios from 'axios';
import './LoginPage.css';
import { AuthContext } from './AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // Access the login function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.data.success) {
        login(response.data.token); // Update authentication state
        window.location.href = '/'; // Redirect after login
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 'An unexpected error occurred. Please try again later.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <ArrowRightToLine className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-8">Please sign in to your account</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                required
              />
              <Mail className="register-field-icon w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                required
              />
              <Lock className="register-field-icon w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <a href="/RegisterPage" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </a>
        </div>
        <div className="text-center mt-6 text-gray-600">
  
          <a href="/ForgotPasswordPage" className="text-blue-600 hover:text-blue-700 font-medium">
            Forget Password
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
