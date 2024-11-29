import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';
import { useAuth } from './AuthContext';

const BookingForm = () => {
  const { isAuthenticated, userToken } = useAuth();
  const { serviceName } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [serviceId, setServiceId] = useState(null);
  const [serviceDetailsVisible, setServiceDetailsVisible] = useState(false);
  const [msg, setMsg] = useState('');
  const [clientDetails, setClientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    smsReminder: false,
  });
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const toggleServiceDetails = () => {
    setServiceDetailsVisible(!serviceDetailsVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      const returnUrl = `/bookingform/${serviceName}?date=${date}&time=${time}&name=${clientDetails.name}`;
      navigate(`/LoginPage?returnUrl=${encodeURIComponent(returnUrl)}`);
      return;
    }

    // Validate fields
    const errors = {};
    if (!clientDetails.name) errors.name = true;
    if (!clientDetails.email) errors.email = true;
    if (!clientDetails.phone) errors.phone = true;
    if (!clientDetails.message) errors.message = true;

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Prepare data for submission
    const bookingData = {
      client_name: clientDetails.name,
      service: serviceId,
      date,
      time,
      client_phone: clientDetails.phone,
      client_email: clientDetails.email,
      message: clientDetails.message,
    };

    try {
      // Submit booking data with authorization token
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      alert('Booking successful!');
      navigate('/confirmation', { state: { booking: response.data } });
    } catch (error) {
      console.error('Error submitting data:', error.response?.data);
      setMsg('Failed to create booking. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'name') {
      setClientDetails((prevDetails) => ({
        ...prevDetails,
        text: `Dear ${value}, your booking for ${serviceName} on ${date} at ${time} has been confirmed.`,
      }));
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  useEffect(() => {
    const fetchServiceId = async () => {
      setIsLoading(true);
      try {
        // Encode the service name to handle special characters
        const encodedServiceName = encodeURIComponent(serviceName);
        
        // Make sure to use exact matching in the query
        const response = await axios.get(`http://localhost:5000/api/services/by-name/${encodedServiceName}`);
        
        if (response.data && response.data._id) {
          setServiceId(response.data._id);
        } else {
          setMsg('Service not found');
          console.error('Service not found or ID missing');
        }
      } catch (error) {
        setMsg('Error fetching service details');
        console.error('Error fetching service ID:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceName) {
      fetchServiceId();
    }
  }, [serviceName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-form-container">
      <Link to={`/schedule/${serviceName}/`}>
        <Button>Back</Button>
      </Link>
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Client Details</h2>
        <p>Tell us a bit about yourself</p>
        <p>
          Already have an account? <Link to="/login">Log In</Link> for faster booking.
        </p>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={clientDetails.name}
            onChange={handleChange}
            required
          />
          {validationErrors.name && <span className="error-message">Name is required.</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={clientDetails.email}
            onChange={handleChange}
            required
          />
          {validationErrors.email && <span className="error-message">Email is required.</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={clientDetails.phone}
            onChange={handleChange}
            required
          />
          {validationErrors.phone && <span className="error-message">Phone is required.</span>}
        </div>

        <div className="form-group">
          <label htmlFor="smsReminder">
            <input
              type="checkbox"
              id="smsReminder"
              name="smsReminder"
              checked={clientDetails.smsReminder}
              onChange={handleChange}
            />
            I want to receive an SMS reminder 24 hours before this session starts
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="message">Add Your Message *</label>
          <textarea
            type="text"
            id="message"
            name="message"
            value={clientDetails.message}
            onChange={handleChange}
            required
          />
          {validationErrors.message && <span className="error-message">Message is required.</span>}
        </div>
        <button type="submit">Book Now</button>
      </form>
      <div className="Booking-details-wrapper">
        <button className="accordion-button" onClick={toggleServiceDetails}>
          Booking Details
          {serviceDetailsVisible ? <span className="arrow">&#9650;</span> : <span className="arrow">&#9660;</span>}
        </button>
        {serviceDetailsVisible && (
          <div className="service-details-content">
            <p>{serviceName}</p>
            <p>
              {date} at {time}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
