import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';

const SchedulePage = () => {
  const { serviceName } = useParams();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timezone, setTimezone] = useState('IST');
  const [showAllSessions, setShowAllSessions] = useState(false);
  const [serviceDetailsVisible, setServiceDetailsVisible] = useState(false);
  const [showAllButton, setShowAllButton] = useState(true);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Slot-Ekamvida";
    formatDisplayDate(selectedDate);
  }, [selectedDate]);

  const formatDisplayDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    setFormattedDate(date.toLocaleDateString(undefined, options));
  };

  // Format date for API request with timezone consideration
  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Convert time to selected timezone
  const convertToTimezone = (date, time, fromTimezone, toTimezone) => {
    const [hours, minutes] = time.split(':');
    const dateObj = new Date(date);
    dateObj.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // Create formatter for target timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: toTimezone === 'IST' ? 'Asia/Kolkata' : 'Europe/London'
    });

    return formatter.format(dateObj);
  };

  useEffect(() => {
    const fetchTimeSlots = async () => {
      setLoading(true);
      try {
        const dateStr = formatDateForAPI(selectedDate);
        const response = await axios.get(`http://localhost:5000/api/timeslots`, {
          params: {
            date: dateStr,
            timezone,
            serviceName
          }
        });

        // Transform the time slots data with proper timezone conversion
        const formattedSlots = response.data.map(slot => {
          // Assuming slot.time is in 24-hour format "HH:mm"
          const displayTime = convertToTimezone(
            selectedDate,
            slot.time,
            'UTC', // Assuming backend sends times in UTC
            timezone
          );

          return {
            ...slot,
            originalTime: slot.time, // Keep original time for submission
            displayTime: displayTime // Formatted time for display
          };
        });

        // Sort time slots by original time
        const sortedSlots = formattedSlots.sort((a, b) => {
          return a.originalTime.localeCompare(b.originalTime);
        });

        setTimeSlots(sortedSlots);
      } catch (error) {
        console.error("Failed to fetch time slots:", error);
        setTimeSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate, timezone, serviceName]);

  const handleTimeSelection = (slot, index) => {
    setSelectedTime(slot.originalTime); // Store original time for submission
    setSelectedSlotIndex(index);
  };

  const handleDateChange = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    setSelectedDate(newDate);
    setShowAllSessions(false);
    setShowAllButton(true);
    setSelectedTime('');
    setSelectedSlotIndex(null);
  };

  const handleTimezoneChange = (newTimezone) => {
    setTimezone(newTimezone);
    setShowAllSessions(false);
    setShowAllButton(true);
    setSelectedTime('');
    setSelectedSlotIndex(null);
  };

  const renderTimeSlots = () => {
    if (loading) {
      return <div className="loading">Loading available time slots...</div>;
    }

    if (timeSlots.length === 0) {
      return (
        <div className="no-slots">
          <p>No availability for the selected date.</p>
          <Button onClick={handleNextAvailability}>Check Next Availability</Button>
        </div>
      );
    }

    const slotsToShow = showAllSessions ? timeSlots : timeSlots.slice(0, 10);
    return (
      <ul className="time-slots">
        {slotsToShow.map((slot, index) => (
          <li key={slot.id || index}>
            <button
              className={`time-slot-button ${selectedSlotIndex === index ? 'selected' : ''}`}
              onClick={() => handleTimeSelection(slot, index)}
            >
              {slot.displayTime}
            </button>
          </li>
        ))}
        {timeSlots.length > 10 && !showAllSessions && (
          <li>
            <Button onClick={() => setShowAllSessions(true)}>
              Show All Sessions
            </Button>
          </li>
        )}
      </ul>
    );
  };

  const handleNextAvailability = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0);
    setSelectedDate(nextDate);
  };

  return (
    <div className="booking-modal">
      <Link to="/ServicePage">
        <Button>Back</Button>
      </Link>
      <h1>{serviceName}</h1>
      <p>Check out our availability and book the date and time that works for you</p>
      
      <div className="horizontal-container">
        <div className="calendar-wrapper">
          <h3>Select a Date</h3>
          <Calendar 
            onChange={handleDateChange} 
            value={selectedDate}
            minDate={new Date()} // Prevent selecting past dates
          />
        </div>

        <div className="time-slots-wrapper">
          <div className="timezone-wrapper">
            <select 
              value={timezone} 
              onChange={(e) => handleTimezoneChange(e.target.value)}
              className="timezone-select"
            >
              <option value="IST">India Standard Time (GMT+5:30)</option>
              <option value="BST">British Summer Time (GMT+1)</option>
            </select>
            <p className="selected-date">{formattedDate}</p>
          </div>
          {renderTimeSlots()}
        </div>

        <div className="service-details-wrapper">
          <button 
            className="accordion-button"
            onClick={() => setServiceDetailsVisible(!serviceDetailsVisible)}
          >
            Service Details
            <span className="arrow">
              {serviceDetailsVisible ? '▲' : '▼'}
            </span>
          </button>
          
          {serviceDetailsVisible && (
            <div className="service-details-content">
              <p>Service: {serviceName}</p>
              <p>Date: {selectedDate.toLocaleDateString()}</p>
              {selectedTime && (
                <p>Time: {timeSlots.find(slot => slot.originalTime === selectedTime)?.displayTime}</p>
              )}
            </div>
          )}

          <Link 
            to={`/booking/${serviceName}?date=${formatDateForAPI(selectedDate)}&time=${selectedTime}`}
          >
            <Button 
              className="next-button" 
              disabled={!selectedTime}
              type="primary"
            >
              Next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;