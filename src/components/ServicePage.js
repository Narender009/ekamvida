import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './ServicePage.css'; // Import the CSS file
import Header from './Header';


const ServicePage = () => {
  const [services, setServices] = useState([]);
    // Create a state to manage which service's info-section is open
    const [openService, setOpenService] = useState(null);

    const toggleReadMore = (id) => {
      // Toggle the openService state
      if (openService === id) {
        setOpenService(null); // Close if it's already open
      } else {
        setOpenService(id); // Open the selected service
      }
    };


  // useEffect(() => {
  //   document.title = "Service-Ekamvida"
  //   axios.get('http://localhost:8000/api/services/')
  //     .then(response => {
  //       setServices(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the services!', error);
  //     });
  // }, []);


  // In your ServicePage.js, update the useEffect hook:
  useEffect(() => {
    const fetchServices = async () => {
       try {
          const response = await axios.get('http://localhost:5000/api/services');
          console.log(response.data);  // Log the response
          setServices(response.data);
       } catch (error) {
          console.error('Error fetching services:', error);
       }
    };
    fetchServices();
 }, []);
 

  return (
    <div>
      <Navbar/> 
      <div className="hero">
        <div className="hero-text">
        <div class="logo4">
            <img src="images/background-2.svg" alt="Logo"/>
        </div>
          <h1>Group Yoga Classes</h1>
        </div>
      </div>
      <div className="container-1">
      <div className="left-side">
        <h2>Important Information</h2>
        <p>All our yoga classes are conducted in <span>English.</span></p>
        <p>
          Class bookings and session updates are <span>conducted through our WhatsApp group -</span> whether you’re a new member of our community, or a returning yogi, please contact us to join.
        </p>
        <p>
          <span>Class locations vary for each session - </span><br />
          the most updated information can be found in our WhatsApp group, please contact us to join.
        </p>
        <a href="#" className="button-left">
          Join us on WhatsApp <img src='images/WhatsApp.svg' alt="WhatsApp" />
        </a>
        <div className="decorative-right-side">
          <img src='images/background-2.svg' alt="Decorative element" />
        </div>
      </div>

      <div className="right-side">
        <h3>We offer yoga classes for active flow, mindful meditation, and specialty practices:</h3>
        {services.map(service => (
          <div key={service._id} className={`yoga-class ${openService === service._id ? 'expanded' : ''}`}>
              <img src={service.image} alt={service.service_name} />
              <div className='button-yoga-class'>
                <div className="yoga-info">
                    <h2>{service.service_name}</h2>
                    <p>{service.description}</p>
                </div>
                <div className="button-class">
                    <Link to={`/schedule/${service.service_name}`} className="right-side-button">
                      Book a class
                    </Link>
                    <a className="read-more-button" onClick={() => toggleReadMore(service._id)}>
                      {openService === service._id ? 'Read less' : 'Read more'}
                      <img
                          src={openService === service._id ? 'images/minus.svg' : 'images/plus.svg'}
                          style={{ width: '20px', height: '20px' }}
                          alt="toggle-icon"
                      />
                    </a>
                </div>
              </div>

              {openService === service._id && (
                <div className="info-section">
                    <div className="column">
                      <h3>What to Expect</h3>
                      <ul>
                          {service.what_to_expect.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="column">
                      <h3>Benefits</h3>
                      <ul>
                          {service.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="column">
                      <h3>Suitable For</h3>
                      <ul>
                          {service.suitable_for.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ul>
                    </div>
                </div>
              )}
          </div>
        ))}

      
    </div>

      <Outlet />
    </div>
    <Header />

    </div>
  );
};

export default ServicePage;
