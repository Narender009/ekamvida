import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import './AccountPage.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await axiosInstance.get('/bookings');
        setBookings(response.data);
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Failed to fetch bookings';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      await axiosInstance.delete(`/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to cancel booking';
      alert(errorMessage);
    }
  };

  const currentDate = new Date();

  const upcomingBookings = bookings.filter((booking) => new Date(booking.date) >= currentDate);
  const pastBookings = bookings.filter((booking) => new Date(booking.date) < currentDate);

  return (
    <div className="bookings-section max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
          <CardDescription>View and manage your bookings</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading bookings...</p>
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <>
              <h3 className="text-xl font-bold mb-4">Upcoming Bookings</h3>
              {upcomingBookings.length === 0 ? (
                <p>You have no upcoming bookings.</p>
              ) : (
                <div className="bookings-list space-y-4">
                  {upcomingBookings.map((booking) => {
                    const serviceName = booking.service?.service_name || 'Unknown Service';
                    const instructorName = booking.instructor?.name || 'Unknown Instructor';
                    const bookingDate = booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A';
                    const bookingTime = booking.time || 'N/A';

                    return (
                      <div
                        key={booking.id}
                        className="booking-item bg-gray-100 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-bold">{serviceName}</h3>
                          <p className="text-sm text-gray-600">Instructor: {instructorName}</p>
                          <p className="text-sm text-gray-600">Date: {bookingDate}</p>
                          <p className="text-sm text-gray-600">Time: {bookingTime}</p>
                        </div>
                        <Button
                          variant="destructive"
                          className="cancel-booking-btn"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}

              <h3 className="text-xl font-bold mt-6 mb-4">Booking History</h3>
              {pastBookings.length === 0 ? (
                <p>You have no past bookings.</p>
              ) : (
                <div className="bookings-list space-y-4">
                  {pastBookings.map((booking) => {
                    const serviceName = booking.service?.service_name || 'Unknown Service';
                    const instructorName = booking.instructor?.name || 'Unknown Instructor';
                    const bookingDate = booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A';
                    const bookingTime = booking.time || 'N/A';

                    return (
                      <div
                        key={booking.id}
                        className="booking-item bg-gray-100 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-bold">{serviceName}</h3>
                          <p className="text-sm text-gray-600">Instructor: {instructorName}</p>
                          <p className="text-sm text-gray-600">Date: {bookingDate}</p>
                          <p className="text-sm text-gray-600">Time: {bookingTime}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyBookings;
