import React from 'react'
import Navbar from './Navbar'
import './Contactus.css'
import Header from './Header'

const contactus = () => {


  const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default GET request on form submission

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    public_group: document.getElementById('public-group').checked,
    private_group: document.getElementById('private-group').checked,
    private_1_1: document.getElementById('private-1-1').checked,
    other: document.getElementById('other').checked,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Check if the response was successful
    if (response.ok) {
      // Show success message (You can also use a modal or inline message instead of alert)
      alert('Message sent successfully!');

      // Reset the form fields to blank
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('public-group').checked = false;
      document.getElementById('private-group').checked = false;
      document.getElementById('private-1-1').checked = false;
      document.getElementById('other').checked = false;
      document.getElementById('message').value = '';
    } else {
      const errorData = await response.json();
      console.log('Error in response:', errorData);

      // Optionally, display a message or alert for the error
      alert('There was an issue submitting the form. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting form', error);
    alert('An error occurred. Please try again.');
  }
};

  return (
    <div >
      <Navbar />

        <div className="hero-seatedfold">
        <div className="hero-text-seatedfold">
          <h1>Get in touch with us</h1>
          <div className="logo-seatedfold">
            <img src="images/background-2.svg" alt="Logo"/>
        </div>
        </div>
      </div>
     <div className='bg-container'>
      <div className="contact-us-container">
      <div className="bg">
      <div className="decorative-contact-us-container-right">
        <img src='images/background-2.svg' alt="Decorative element" />
      </div>
      <h2 className="text-2xl">Got a question?</h2>
      <h3 className="text-xl">Reach out to us anytime</h3>
      <p className="mb-4">Send us an email with your enquiry and we'll get back to you as soon as we can!</p>
      <p className="mb-4">Or reach out to us through the following contact information</p>
      <address className="not-italic">
        <p>2/F, Tung Chung Municipal Services Building,</p>
        <p>39 Man Tung Rd, Tung Chung</p>
        <p><a href="mailto:hello@georgialouiseyoga.com" className="text-var">hello@georgialouiseyoga.com</a></p>
        <p><a href="tel:+85296832177" className="text-var">+852 9683 2177</a></p>
      </address>
      <div className="flex">
        <a href="#" aria-label="Facebook">
          <img src="images/Instagram.svg" alt="Facebook icon" className="w-6 h-6" />
        </a>
        <a href="#" aria-label="Instagram">
          <img src="images/Facebook.svg" alt="Instagram icon" className="w-6 h-6" />
        </a>
        <a href="#" aria-label="WhatsApp">
          <img src="images/WhatsApp.svg" alt="WhatsApp icon" className="w-6 h-6" />
        </a>
      </div>
    </div>

    <div className="container-cotact-us">
      <form className="container-cotact-us-form" onSubmit={handleSubmit}>
        <div className="container-cotact-us-form-grid">
          <div className="container-cotact-us-form-group">
            <label for="name">Name*</label>
            <input type="text" id="name" name="name" placeholder="John Appleseed"/>
          </div>
          <div className="container-cotact-us-form-group">
            <label for="email">Email address*</label>
            <input className='input-email' type="email" id="email" name="email" placeholder="johnappleseed@example.com"/>
          </div>
        </div>
        <div className="container-cotact-us-form-group">
          <label>What services are you interested in?*</label>
          <div className="container-cotact-us-checkbox-group">
            <div className="container-cotact-us-checkbox-item">
              <input id="public-group" name="services" type="checkbox"/>
              <label for="public-group">Public group classes</label>
            </div>
            <div className="container-cotact-us-checkbox-item">
              <input id="private-group" name="services" type="checkbox"/>
              <label for="private-group">Private group classes</label>
            </div>
            <div className="container-cotact-us-checkbox-item">
              <input id="private-1-1" name="services" type="checkbox"/>
              <label for="private-1-1">Private 1:1 classes</label>
            </div>
            <div className="container-cotact-us-checkbox-item">
              <input id="other" name="services" type="checkbox"/>
              <label for="other">Other</label>
            </div>
          </div>
        </div>
        <div className="container-cotact-us-form-group">
          <label for="message">Message*</label>
          <textarea id="message" name="message" rows="5" placeholder="Type your message here" />
        </div>
        <div className="container-cotact-us-form-actions">
          <button className='button-form-actions' >Send message</button>
        </div>
      </form>
    </div>
  </div>
  </div>
  
    <Header />
      
    </div>
  )
}

export default contactus

