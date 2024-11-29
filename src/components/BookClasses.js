import React, { useState, useEffect } from 'react';
import './BookClasses.css';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookClasses = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [clientDetails, setClientDetails] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        smsReminder: false
    });
    const [validationErrors, setValidationErrors] = useState({
        name: false,
        email: false,
        phone: false
    });
    const [schedule, setSchedule] = useState(location.state?.schedule || {
        service: '',
        instructor: '',
        date: '',
        start_time: '',
        end_time: '',
        timezone: ''
    });

    const isLoggedIn = () => {
        // Check login status, for example using a token in localStorage
        return localStorage.getItem('token') !== null;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // If user is not logged in, redirect to login page
        if (!isLoggedIn()) {
            alert('Please log in to book a class');
            navigate('/LoginPage', { state: { redirectTo: location.pathname, schedule } });
            return;
        }

        // Validate form fields
        const errors = {};
        if (!clientDetails.name) errors.name = true;
        if (!clientDetails.email) errors.email = true;
        if (!clientDetails.phone) errors.phone = true;

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/book-class', {
                clientDetails,
                schedule
            });

            console.log('Booking successful:', response.data);
            alert('Booking request sent successfully!');
            navigate('/BookSummary', { state: { clientDetails, schedule } });
        } catch (error) {
            console.error('Error sending booking request:', error);
            alert('Failed to send booking request. Please try again.');
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
                text: `Dear ${value}, your booking for ${schedule.service} on ${schedule.date} at ${schedule.start_time} - ${schedule.end_time} has been confirmed.`,
            }));
        }

        // Clear validation error for the changed field
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));
    };

    const toggleDropdown = () => {
        setIsDropdownActive(!isDropdownActive);
    };


    return (
        <div>
  
            <div className="containerbb">
                <div className="p-6-cb bg-card-cb text-card-foreground-cb">
                    <a href="/Schedule" className="text-muted-foreground-cb mb-4-cb inline-block-cb">&lt; Back</a>
                    <h2 className="text-xl-cb font-semibold-cb mb-4-cb">Client Details</h2>
                    <hr />
                    <p className="text-muted-foreground-cb mb-2-cb">Tell us a bit about yourself</p>
                    <div className="bg-muted-cb p-4-cb mb-4-cb">
                        <p className="text-muted-foreground-cb">Already have an account? <a href="#" className="text-primary-cb">Log In</a> for faster booking.</p>
                    </div>
                    <form className="space-y-4-cb" onSubmit={handleFormSubmit}>
                        <div className="flex-cb space-x-4-cb">
                            <div className="flex-1-cb">
                                <label htmlFor="name" className="block-cb text-sm-cb font-medium-cb">Name *</label>
                                <input type="text" id="name" name="name" value={clientDetails.name} onChange={handleChange} className={`mt-1-cb block-cb w-full-cb border-cb border-border-cb p-2-cb ${validationErrors.name ? 'border-red-500' : ''}`} />
                                {validationErrors.name && <p className="text-red-500 text-xs">Name is required</p>}
                            </div>
                            <div className="flex-1-cb">
                                <label htmlFor="email" className="block-cb text-sm-cb font-medium-cb">Email *</label>
                                <input type="email" id="email" name="email" value={clientDetails.email} onChange={handleChange} className={`mt-1-cb block-cb w-full-cb border-cb border-border-cb p-2-cb ${validationErrors.email ? 'border-red-500' : ''}`} />
                                {validationErrors.email && <p className="text-red-500 text-xs">Email is required</p>}
                                <span className="text-muted-foreground-cb text-xs-cb float-right-cb mt-1-cb">0/100</span>
                            </div>
                        </div>
                        <div className="flex-cb space-x-4-cb">
                            <div className="flex-1-cb">
                                <label htmlFor="phone" className="block-cb text-sm-cb font-medium-cb">Phone Number</label>
                                <div className="flex mt-1">
                                    <select className="border-cb border-border-cb p-2-cb" name="phonePrefix" onChange={handleChange}>
                                        {/* Add phone prefixes */}
                                        <option value="+91">India</option>
                                        {/* Add more options */}
                                    </select>
                                    <input type="text" id="phone" name="phone" value={clientDetails.phone} onChange={handleChange} className={`flex-1-cb border-cb border-border-cb p-2-cb ${validationErrors.phone ? 'border-red-500' : ''}`} />
                                    {validationErrors.phone && <p className="text-red-500 text-xs">Phone number is required</p>}
                                </div>
                            </div>
                        </div>
                        <div className="flex-cb items-center-cb space-x-2-cb">
                            <input type="checkbox" id="sms-reminder" name="smsReminder" checked={clientDetails.smsReminder} onChange={handleChange} className="border-cb border-border-cb" />
                            <label htmlFor="sms-reminder" className="text-sm-cb">I want to receive an SMS reminder 24 hours before this session starts</label>
                        </div>
                        <div>
                            <label htmlFor="message" className="block-cb text-sm-cb font-medium-cb">Add Your Message</label>
                            <textarea id="message" name="message" value={clientDetails.message} onChange={handleChange} rows="4" className="mt-1-cb block-cb w-full-cb border-cb border-border-cb p-2-cb"></textarea>
                        </div>
                        <button type="submit" className="w-full-cb bg-primary-cb text-primary-foreground-cb hover:bg-primary/80-cb p-2-cb rounded-cb">Request to Book</button>
                    </form>
                </div>
                <div className="p-6-cb bg-card-cb text-card-foreground-cb">
                    <h2 className="text-xl-cb font-semibold-cb mb-4-cb">
                        <div className={`dropdown ${isDropdownActive ? 'active' : ''}`}>
                            <button className="dropdown-button-cb" onClick={toggleDropdown}>
                                Booking Details
                                <span className={`dropdown-arrow-cb ${isDropdownActive ? 'active' : ''}`}>&#9662;</span>
                            </button>
                            {isDropdownActive && (
                                <div className="dropdown-content-cb">
                                    <div className="border-b-cb border-border-cb pb-4-cb mb--cb">
                                        <h2 className="text-lg font-semibold">{schedule.day}, {new Date(schedule.date).toLocaleDateString()}</h2>
                                        <p>Time: {schedule.start_time} - {schedule.end_time} {schedule.timezone}</p>
                                        <p>Service: {schedule.service.service_name}</p>
                                        <p>Instructor: {schedule.instructor.name}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default BookClasses;
