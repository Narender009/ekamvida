import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Alert } from 'antd';
import axios from 'axios';
import { useAuth } from './AuthContext';

const BookingHistory = () => {
  const { user, userToken, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/bookings/user/${user.id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error.response?.data || error.message);
      setError('Failed to fetch booking history. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error('Error cancelling booking:', error.response?.data || error.message);
      setError('Failed to cancel booking. Please try again.');
    }
  };

  const confirmCancellation = (bookingId) => {
    Modal.confirm({
      title: 'Are you sure you want to cancel this booking?',
      onOk: () => cancelBooking(bookingId),
    });
  };

  const columns = [
    { title: 'Service', dataIndex: 'serviceName', key: 'serviceName', render: (_, record) => record.service.name },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <span className={status}>{status}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        record.status === 'pending' ? (
          <Button type="danger" onClick={() => confirmCancellation(record._id)}>
            Cancel
          </Button>
        ) : (
          'N/A'
        ),
    },
  ];

  return (
    <div className="booking-history">
      <h2>Your Booking History</h2>
      {error && <Alert message={error} type="error" showIcon />}
      <Table
        dataSource={bookings.map((booking) => ({
          key: booking._id,
          serviceName: booking.service.name,
          date: booking.date,
          time: booking.time,
          status: booking.status,
        }))}
        columns={columns}
        loading={loading}
      />
    </div>
  );
};

export default BookingHistory;
