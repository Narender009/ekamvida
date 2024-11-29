import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Events.css';
import axios from 'axios';
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('upcoming'); // 'upcoming' or 'past'
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [view]);

  const fetchEvents = () => {
    const endpoint = view === 'upcoming' ? 'upcoming' : 'past';
    axios.get(`http://127.0.0.1:5000/api/events/?view=${endpoint}`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
      });
  };

  const isLoggedIn = () => {
    // Check login status, for example using a token in localStorage
    return localStorage.getItem('token') !== null;
};


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isLoggedIn()) {
      alert('Please log in to register a event');
      navigate('/LoginPage', { state: { redirectTo: location.pathname, events, } });
      return;
  }
  
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      event: selectedEvent._id, // Match backend schema
      title: selectedEvent.title,
      date: selectedEvent.date,
      time: selectedEvent.time,
      location: selectedEvent.location,
    };
    
  
    axios.post(`http://127.0.0.1:5000/api/registrations/`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        alert('Registration successful!');
        setShowForm(false);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          alert(`Error: ${error.response.data.error || 'Failed to register. Please try again.'}`);
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      });
  };
  
  
  

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const [day, month, year, weekday] = formattedDate.split(' ');
    return `${month} ${year} ${weekday} (${day})`;
  };

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowForm(true);
    setShowDetails(false); // Hide details when showing form
  };

  const handleViewDetailsClick = (event) => {
    setSelectedEvent(event);
    setShowDetails(true);
    setShowForm(false); // Hide form when showing details
  };

  const RegistrationForm = ({ event }) => (
<div className="registration-form">
  <h2>Register for {event.title}</h2>
  <p>{formatDate(event.date)} | {event.time} | {event.location}</p>
  <form onSubmit={handleSubmit}>
    <label>
      Name:
      <input type="text" name="name" required />
    </label>
    <label>
      Email:
      <input type="email" name="email" required />
    </label>
    <label>
      Phone:
      <input
        type="tel"
        name="phone"
        required
        pattern="^\+?[1-9]\d{1,14}$"
        title="Please enter a valid phone number (e.g., +1234567890)"
      />
    </label>
    <button type="submit">Submit</button>
  </form>
  <button onClick={() => setShowForm(false)}>Close</button>
</div>

  );
  

  const EventDetails = ({ event }) => (
    <div className="event-details-modal">
      <h2>{event.title}</h2>
      <p>{formatDate(event.date)} | {event.time} | {event.location}</p>
      <p>{event.description}</p>
      <button onClick={() => setShowDetails(false)}>Close</button>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="hero-forearmstand">
        <div className="hero-text-forearmstand">
        <div class="logo4-forearmstand">
            <img src="images/background-2.svg" alt="Logo"/>
        </div>
          <h1>Join us at our events</h1>
        </div>
      </div>

      <div className="container-event">
        <div className="header-event">
          <h2>
            Check out our {view === 'upcoming' ? 'upcoming' : 'past'} events and be part of our vibrant community
          </h2>
          <a href="#" className="button-event" onClick={() => setView(view === 'upcoming' ? 'past' : 'upcoming')}>
            {view === 'upcoming' ? 'See past events' : 'See upcoming events'}
          </a>
        </div>
        <div className="events-container">
          {events.map((event) => (
            <div className="event" key={event.id}>
              <img src={`http://localhost:5000${event.image}`} alt={event.title} className="event-image" />
              <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-info">
                  {formatDate(event.date)} | {event.time} | {event.location}
                </div>
                <p>{event.description}</p>
              </div>
              <div className="event-actions">
                <a href="#" className="button-event-actions-first" onClick={() => handleRegisterClick(event)}>
                  Register for event <img src='images/chevron-right.svg' style={{height:'20px', width:'20px'}}/>
                </a>
                <a href="#" className="button-event-actions-second" onClick={() => handleViewDetailsClick(event)}>
                  View event details <img src='images/chevron-right.svg' style={{height:'20px', width:'20px', filter: 'invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)'}}/>
                </a>
              </div>
             
            </div>
          ))}
        </div>
        <div className='see-past'> <h1>Stay tuned for more!</h1>
        <a href="#" className="button-event" onClick={() => setView(view === 'upcoming' ? 'past' : 'upcoming')}>
            {view === 'upcoming' ? 'See past events' : 'See upcoming events'}
          </a>
          </div>
      </div>

      {/* Render the registration form if showForm is true */}
      {showForm && <RegistrationForm event={selectedEvent} />}

      {/* Render the event details if showDetails is true */}
      {showDetails && <EventDetails event={selectedEvent} />}

     <Header />
      
    </div>
  );
}

export default Events;
