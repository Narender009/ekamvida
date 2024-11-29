import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Events.css';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('upcoming'); // 'upcoming' or 'past'

  useEffect(() => {
    fetchEvents();
  }, [view]);

  const fetchEvents = () => {
    const endpoint = view === 'upcoming' ? 'upcoming' : 'past';
    axios.get(`http://127.0.0.1:8000/api/events/?view=${endpoint}`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
      });
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const [day, month, year, weekday] = formattedDate.split(' ');
    return `${month} ${year} ${weekday} (${day})`;
  };

  return (
    <div>
      <Navbar/>
      <div className="container9">
        <div className="header9">
          <h2>Check out our {view === 'upcoming' ? 'upcoming' : 'past'} events and be part of our vibrant community</h2>
          <a href="#" className="button" onClick={() => setView(view === 'upcoming' ? 'past' : 'upcoming')}>
            {view === 'upcoming' ? 'See past events' : 'See upcoming events'}
          </a>
        </div>
        <div className="events-container">
          {events.map(event => (
            <div className="event" key={event.id}>
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-info">
                  {formatDate(event.date)} | {event.time} | {event.location}
                </div>
                <p>{event.description}</p>
              </div>
              <div className="event-actions">
                <a href="#" className="button">Register for event</a>
                <a href="#" className="button">View event details</a>
              </div>
            </div>
          ))}
        </div>
        <div className="footer1">
          <p>Stay tuned for more!</p>
          <a href="#" className="button" onClick={() => setView(view === 'upcoming' ? 'past' : 'upcoming')}>
            {view === 'upcoming' ? 'See past events' : 'See upcoming events'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Events;
