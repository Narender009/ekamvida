import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom'; // Import useHistory
// Import Button from Ant Design or any other UI library you are using

const BookingSummary = () => {
  const { serviceName } = useParams();
  const { search } = useLocation(); // Initialize useHistory
  const queryParams = new URLSearchParams(search);
  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const name = queryParams.get('name');
  
  // Handle back button click


  return (
    <div className="booking-summary-container">
      <h2>Booking Confirmation</h2>
      <div className="service-details">
        <p>Service Name: {serviceName}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
      </div>
      <div className="client-details">
        <p>Client Name: {name}</p>
      </div>
      <div className="buttons-container">
        
      </div>
    </div>
  );
};

export default BookingSummary;
