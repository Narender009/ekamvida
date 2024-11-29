import React from 'react';
import './Footer.css'; // Assuming you store styles here
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id='footer' className="footer">
      <div className="footer-top">
        <div className="contact-info">
          <ul>
          <li>
          <h1>Got a question?<br /> Reach out to us anytime</h1>
          <div className="social-icons">
            <FaInstagram />
            <FaFacebookF />
            <FaWhatsapp />
          </div>
          </li>
          </ul>
          <ul>
            <li>
          <address>
            2/F, Tung Chung Municipal Services Building,<br />
            39 Man Tung Rd, Tung Chung<br />
            <span className='span'>
            hello@georgialouiseyoga.com<br />
            +852 9638 2177
            </span>
          </address>
          <button className="contact-button">Contact Us</button>
          </li>
          </ul>
          
        </div>
        <div className="footer-links">
          <ul>
            <li>Group Yoga Classes</li>
            <li>Private Classes</li>
            <li>Schedule</li>
            <li>Pricing & Packages</li>
          </ul>
          <ul>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Events</li>
            <li>Blog</li>
            <li>About Us</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © GL Yoga 2024. All Rights Reserved.</p>
        <ul className="footer-legal">
          <li>Terms and Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
