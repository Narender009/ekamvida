import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ConfirmBooking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
        if (location.state) {
            const { clientDetails, schedule } = location.state;
            if (clientDetails && schedule) {
                setBookingData({ clientDetails, schedule });
            } else {
                console.error('Incomplete booking data received');
                navigate('/book-classes');
            }
        } else {
            console.error('No state received from BookClasses');
            navigate('/book-classes');
        }
    }, [location, navigate]);

    const handleConfirmBooking = async () => {
        if (!bookingData) {
            console.error('No booking data available');
            return;
        }
    
        const { clientDetails, schedule } = bookingData;
    
        try {
            // Fetch all services and instructors
            const servicesResponse = await axios.get('http://localhost:8000/api/services/');
            const instructorsResponse = await axios.get('http://localhost:8000/api/instructors/');
    
            // Find the matching service and instructor
            const service = servicesResponse.data.find(s => s.service_name === schedule.service);
            const instructor = instructorsResponse.data.find(i => i.instructor_name === schedule.instructor);
    
            if (!service || !instructor) {
                throw new Error('Service or instructor not found');
            }
    
            // Send bookingData to the first backend endpoint
            const firstBookingData = {
                client_name: clientDetails.name,
                booking_date: schedule.date,
                booking_time: schedule.start_time,
                service_name: service.service_name,
                email: clientDetails.email,
                phone: clientDetails.phone,
                message: clientDetails.message,
                sms_reminder: clientDetails.smsReminder,
            };
    
            await axios.post('http://localhost:8000/booking/api/create_booking/', firstBookingData);
            alert('Booking request sent successfully to create_booking endpoint!');
    
            // Prepare data for the second backend endpoint
            const secondBookingData = {
                client_name: clientDetails.name,
                date: schedule.date,
                time: schedule.start_time,
                service: service.id,
                client_email: clientDetails.email,
                client_phone: clientDetails.phone,
                instructor: instructor.id
            };
    
            // Send booking to the second backend endpoint
            await axios.post('http://localhost:8000/api/booking/', secondBookingData);
            alert('Booking request sent successfully to booking endpoint!');
    
            // Send clientDetails to the third backend endpoint
            const response = await axios.post('http://localhost:5000/users', clientDetails);
            console.log(response.data.respMesg);
            alert('Client details sent successfully to users endpoint!');
    
            // Redirect to home page after a delay of 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);
    
        } catch (error) {
            console.error('Error during booking process:', error);
            alert('Error during booking process. Please try again later.');
        }
    };
    


    if (!bookingData) {
        return <div>Loading booking details...</div>;
    }

    const { clientDetails, schedule } = bookingData;

    return (
        <div>
            <div className="p-6">
                <h1 className="text-xl font-semibold mb-4">Confirm Your Booking</h1>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold mb-2">Client Details</h2>
                    <p><strong>Name:</strong> {clientDetails.name}</p>
                    <p><strong>Email:</strong> {clientDetails.email}</p>
                    <p><strong>Phone:</strong> {clientDetails.phone}</p>
                    {clientDetails.message && <p><strong>Message:</strong> {clientDetails.message}</p>}
                    <p><strong>SMS Reminder:</strong> {clientDetails.smsReminder ? 'Yes' : 'No'}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold mb-2">Booking Details</h2>
                    <p><strong>Service:</strong> {schedule.service}</p>
                    <p><strong>Instructor:</strong> {schedule.instructor}</p>
                    <p><strong>Date:</strong> {schedule.date}</p>
                    <p><strong>Time:</strong> {schedule.start_time} - {schedule.end_time} {schedule.timezone}</p>
                </div>
                <button 
                    onClick={handleConfirmBooking} 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded mt-4"
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    );
};

export default ConfirmBooking;
