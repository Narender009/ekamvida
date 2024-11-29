import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './bookSummary.css'; // Optional: Add your styles

const BookingSummary = () => {
    const location = useLocation(); // Access data passed from the `BookClasses` page
    const navigate = useNavigate();
    const { clientDetails, schedule } = location.state || {}; // Destructure clientDetails and schedule

    if (!clientDetails || !schedule) {
        return (
            <div className="container-bs">
                <h2>Booking Summary</h2>
                <p>No booking details found. Please book a class first.</p>
                <button onClick={() => navigate('/')} className="btn-bs">Go to Home</button>
            </div>
        );
    }

    return (
        <div className="container-bs">
            <h2 className="heading-bs">Booking Summary</h2>
            <div className="details-bs">
                <p><strong>Client Name:</strong> {clientDetails.name}</p>
                <p><strong>Email:</strong> {clientDetails.email}</p>
                <p><strong>Phone:</strong> {clientDetails.phone}</p>
                <p><strong>Service:</strong> {schedule.service.service_name || schedule.service}</p>
                <p><strong>Instructor:</strong> {schedule.instructor.name || schedule.instructor}</p>
                <p>
                    <strong>Time:</strong> {schedule.start_time} - {schedule.end_time} {schedule.timezone}
                </p>
                <p><strong>Date:</strong> {new Date(schedule.date).toLocaleDateString()}</p>
            </div>
            <div className="cta-bs">
                <button onClick={() => navigate('/')} className="btn-bs">Go to Home</button>
                <button onClick={() => navigate('/Schedule')} className="btn-bs">Book Another Class</button>
            </div>
        </div>
    );
};

export default BookingSummary;
