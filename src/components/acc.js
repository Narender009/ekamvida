import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/inputs";
import { User, KeyRound, Trash2, LogOut, Calendar } from "lucide-react";
import './AccountPage.css'

const AccountPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [bookings, setBookings] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

    // Define fetchBookingHistory
    const fetchBookingHistory = async () => {
      try {
        const response = await axiosInstance.get('/bookings/history');
        setHistory(response.data);
      } catch (err) {
        console.error('Failed to fetch booking history', err);
      }
    };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/profile');
        setUser(response.data);
        setError('');
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Failed to fetch user profile';
        setError(errorMessage);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get('/bookings');
        setBookings(response.data);
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      }
    };

    // const fetchBookingHistory = async () => {
    //   try {
    //     const response = await axiosInstance.get('/bookings/history');
    //     setHistory(response.data);
    //   } catch (err) {
    //     console.error('Failed to fetch booking history', err);
    //   }
    // };
    

    if (localStorage.getItem('token')) {
      fetchProfile();
      fetchBookings();
      fetchBookingHistory();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
  
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await axiosInstance.patch(`/bookings/${bookingId}/status`, { status: 'cancel' });
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      await fetchBookingHistory(); // Refresh the history
      setMessage('Booking canceled successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  };
  


  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axiosInstance.put('/profile', user);
      setMessage('Profile updated successfully');
      setUser(response.data.user);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to update profile';
      setError(errorMessage);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setError('Both current and new passwords are required');
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.put('/change-password', passwordData);
      setMessage('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to change password';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await axiosInstance.delete('/delete-account');
      localStorage.removeItem('token');
      navigate('/RegisterPage');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to delete account';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="account-page-container max-w-4xl mx-auto p-6">
      {(error || message) && (
        <div className={`account-alert mb-4 p-4 rounded-lg ${
          error ? 'account-alert-error bg-red-50 text-red-600' : 
                  'account-alert-success bg-green-50 text-green-600'
        }`}>
          {error || message}
        </div>
      )}

      <div className="account-nav-buttons flex gap-4 mb-6">
        <Button
          variant={activeSection === 'profile' ? 'default' : 'outline'}
          onClick={() => setActiveSection('profile')}
          className="account-nav-btn flex items-center gap-2"
        >
          <User className="account-nav-icon w-4 h-4" />
          Profile
        </Button>
        <Button
          variant={activeSection === 'password' ? 'default' : 'outline'}
          onClick={() => setActiveSection('password')}
          className="account-nav-btn flex items-center gap-2"
        >
          <KeyRound className="account-nav-icon w-4 h-4" />
          Change Password
        </Button>
        <Button
          variant={activeSection === 'bookings' ? 'default' : 'outline'}
          onClick={() => setActiveSection('bookings')}
          className="account-nav-btn flex items-center gap-2"
        >
          <Calendar className="account-nav-icon w-4 h-4" />
          Bookings
        </Button>
        <Button
          variant={activeSection === 'delete' ? 'destructive' : 'outline'}
          onClick={() => setActiveSection('delete')}
          className="account-nav-btn flex items-center gap-2"
        >
          <Trash2 className="account-nav-icon w-4 h-4" />
          Delete Account
        </Button>
      </div>
      {activeSection === 'profile' && (
        <Card className="account-profile-card">
          <CardHeader className="account-card-header">
            <CardTitle className="account-card-title">Profile Information</CardTitle>
            <CardDescription className="account-card-desc">Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="account-card-content">
            <form onSubmit={handleProfileUpdate} className="account-form space-y-4">
              <div className="account-input-wrapper space-y-2">
                <Input
                  type="text"
                  name="firstName"
                  value={user.firstName || ''}
                  onChange={handleProfileChange}
                  placeholder="First Name"
                  required
                  className="account-input"
                />
              </div>
              <div className="account-input-wrapper space-y-2">
                <Input
                  type="text"
                  name="lastName"
                  value={user.lastName || ''}
                  onChange={handleProfileChange}
                  placeholder="Last Name"
                  required
                  className="account-input"
                />
              </div>
              <div className="account-input-wrapper space-y-2">
                <Input
                  type="email"
                  name="email"
                  value={user.email || ''}
                  onChange={handleProfileChange}
                  placeholder="Email"
                  required
                  className="account-input"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading} 
                className="account-submit-btn w-full"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

{activeSection === 'bookings' && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>
          {bookings.map((booking) => (
            <Card key={booking.id} className="booking-card mb-4">
              <CardHeader>
                <CardTitle>{booking.className}</CardTitle>
                <CardDescription>
                  <div>{booking.service.service_name}</div>
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  onClick={() => handleCancelBooking(booking.id)}
                  disabled={loading}
                >
                  Cancel Booking
                </Button>
              </CardContent>
            </Card>
          ))}

          <h2 className="text-lg font-semibold mt-6 mb-4">Booking History</h2>
          {history.length > 0 ? (
            history.map((pastBooking) => (
              <Card key={pastBooking.id} className="history-card mb-4">
                <CardHeader>
                  <CardTitle>{pastBooking.className}</CardTitle>
                  <CardDescription>
                    {new Date(pastBooking.date).toLocaleDateString()} at {pastBooking.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Status: {pastBooking.status}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No booking history available.</p>
          )}

        </div>
      )}

      {activeSection === 'password' && (
        <Card className="account-password-card">
          <CardHeader className="account-card-header">
            <CardTitle className="account-card-title">Change Password</CardTitle>
            <CardDescription className="account-card-desc">
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="account-card-content">
            <form onSubmit={handleChangePassword} className="account-form space-y-4">
              <div className="account-input-wrapper space-y-2">
                <Input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Current Password"
                  required
                  className="account-input"
                />
              </div>
              <div className="account-input-wrapper space-y-2">
                <Input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="New Password"
                  required
                  minLength={6}
                  className="account-input"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading} 
                className="account-submit-btn w-full"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeSection === 'delete' && (
        <Card className="account-delete-card">
          <CardHeader className="account-card-header">
            <CardTitle className="account-card-title">Delete Account</CardTitle>
            <CardDescription className="account-card-desc">
              Permanently delete your account and all associated data
            </CardDescription>
          </CardHeader>
          <CardContent className="account-card-content space-y-4">
            <p className="account-warning text-red-600">
              Warning: This action cannot be undone.
            </p>
            <Button 
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={loading}
              className="account-delete-btn w-full"
            >
              {loading ? 'Deleting...' : 'Delete Account'}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="account-logout-wrapper mt-6">
        <Button 
          variant="secondary"
          onClick={handleLogout}
          disabled={loading}
          className="account-logout-btn w-full flex items-center justify-center gap-2"
        >
          <LogOut className="account-logout-icon w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AccountPage;