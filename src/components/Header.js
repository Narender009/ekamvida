import React, { useState } from 'react';
import axios from 'axios';
import './ServicePage.css'
import Footer from './Footer'
const Header = () => {
  const [email, setEmail] = useState('');
  const [optIn, setOptIn] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/subscribe/', {
        email: email,
        opt_in: optIn
      });
      setMessage('Subscription successful!');
    } catch (error) {
      setMessage('Subscription failed. Please try again.');
    }
  };
  return (
    <>
        <div class="container">
          <div className='images-triangle-04'>
            <img src="images\triangle-04.jpg" alt="Woman doing yoga in a tropical setting"/>

          </div>

        
    
      <div class="content-first">
        <div>
          <h2>Looking for something more personalized?</h2>
        </div>
        <div class="cta-button-container">
          <p>We offer private classes for individuals and groups up to 6! Get in touch with our team to <br/>tell us what you’d like and learn more about private class packages and offers</p>
          <a href="#" class="cta-button-new">Check out private classes <img src='images\right-chevion.svg'/></a>
        </div>
      </div>
    </div>



      <div class="container-journey">
      <div className="decorative-journey-left">
          <img src='images/background-1 (2).svg' alt="Decorative element" />
        </div>

        <div className="decorative-journey-right">
          <img src='images/background-1 (2).svg' alt="Decorative element" />
        </div>
        <h1>Ready to start your yoga journey?</h1>
        
        <div class="buttons-journey">
          <button class="btn1 primary1">Book your first class</button>
          <button class="btn1 secondary1">View our full schedule</button>
        </div>
        <div class="contact-information"><p>Or <a href="#">get in touch with us</a> to find the right class for you</p></div>
        
        
        
        <h2>Please note</h2>
        
        <p class="note">In case of unforeseen circumstances (e.g. weather conditions, studio availability etc.),
        public group classes are subject to cancellation. We will notify class attendees as soon as possible.</p>
        
        <p class="note">For private bookings: Cancellations in less than 24H prior to scheduled classes will incur
        full price of the class. We may be able to reschedule classes for a later date subject to availability,
        so please inform us of booking changes. Thank you for your understanding.</p>
        
        <div class="terms"><p >For more information regarding our policies, check out our <a href="#">Terms & Conditions</a></p></div>
      </div>


      <div class="blog-section">
        <h2><span>Still curious?</span> Read more on our blog</h2>
        
        <div class="blog-grid">
          <div class="blog-post">
            <img src="images\pexels-mo-eid-10035858 1.png"/>
            <h3>How to make yoga accessible and inclusive for all</h3>
            <p>Laia Bové shares some ways that yoga teachers and studio owners can invite more BIPOC and disabled folks into clas...</p>
          </div>
          
          <div class="blog-post">
            <img src="images\pexels-ekaterina-bolovtsova-4051518 1.png"/>
            <h3>Getting back on your mat? Try these tips to stay focused</h3>
            <p>How can you get back into a regular and sustainable yoga routine after a break? These 6 tips will shed some light on wha...</p>
          </div>
          
          <div class="blog-post">
            <img src="images\pexels-roman-davayposmotrim-35987 1.png" alt="Person in yoga pose on dark background"/>
            <h3>Explained - What are the 8 different limbs of yoga?</h3>
            <p>The Yoga Sutras of Patanjali refers to 8 limbs of yoga, each of which offers guidance on how to live a meaningful an...</p>
          </div>
          
          <div class="blog-post">
            <img src="images\pexels-editor-belal-3150250 1.png" alt="Person doing yoga outdoors"/>
            <h3>5 ways to improve concentration in meditation</h3>
            <p>If you find it difficult to focus, you're not alone. Here are 5 simple and effective ways to improve your concentration and...</p>
          </div>
        </div>
      </div>
      <div id='container-six-firest' class="container6 ">
      <div className="decorative-header-left">
                  <img  src='images/background-2 (1).svg' alt="Decorative element" />
                </div>

                <div className="decorative-header-right">
                  <img src='images/background-2 (1).svg' alt="Decorative element" />
                </div>
              <div class="image-container-6 image-container-six">
                  <img src="images/seated-06.jpg" alt="Yoga Instructors"/>
              </div>
              <div class="text-container">
                  <h1>Brought to you by two passionate instructors</h1>
                  <p>Georgia and Krishna met one day and discovered they both shared a deep and ever-growing love of yoga, sparking an idea for a vibrant community - and so Ekam Vida Yoga was born. Their mission is to unlock and share the benefits of yoga for people everywhere they go.</p>
                  <div class="read-more">
                      <a href="#">Read more <img src='images/arrow-right.svg' /></a>
                  </div>
              </div>
</div>
<div className="newsletter-container">
      <div className="decorative-newsletter-right">
        <img src="images/background-1 (2).svg" alt="Decorative element" />
      </div>

      <div className="newsletter-content">
        <div className="text-section">
          <h2 className="title">Subscribe to the Ekamvida monthly newsletter</h2>
        </div>
        <div className="form-section">
          <label htmlFor="email" className="email-label">Email address</label>
          <div className="form-group-newsletter">
            <input
              className='email-newsletter'
              type="email"
              name="email"
              placeholder="johnappleseed@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="subscribe-button" onClick={handleSubmit}>Subscribe</button>
          </div>
          <div className="opt-in-container">
            <input
              type="checkbox"
              id="opt-in"
              name="opt-in"
              className="opt-in-checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
            />
            <label htmlFor="opt-in" className="opt-in-label">
              I agree to opt-in to Ekamvida Yoga's mailing list.
            </label>
          </div>
          <p className="terms-text">
            By clicking "Subscribe", you are agreeing to our <a href="#" className="terms-link">Terms & Conditions</a> and <a href="#" className="terms-link">Privacy Policy</a>.
          </p>
          <p>{message}</p>
        </div>
      </div>
    </div>
    <Footer/>
      
    </>
  )
}

export default Header
