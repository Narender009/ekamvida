import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const accountMenuRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleAccountMenuClick = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  const handleMobileMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleOutsideClick = (e) => {
    if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
      setShowAccountMenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-first') && !event.target.closest('.mobile-menu-icon')) {
        setOpenDropdown(null);
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(prevDropdown => {
      if (prevDropdown === dropdownName) {
        // If clicking on the same dropdown, close it
        document.getElementById(`${dropdownName}-arrow`).style.transform = 'rotate(0deg)';
        return null;
      } else {
        // If clicking on a different dropdown, close the previous one (if any) and open the new one
        if (prevDropdown) {
          document.getElementById(`${prevDropdown}-arrow`).style.transform = 'rotate(0deg)';
        }
        document.getElementById(`${dropdownName}-arrow`).style.transform = 'rotate(180deg)';
        return dropdownName;
      }
    });
  };

  return (
    <>
    <nav id="navbar">
      <div className="navbar">
        <div className="logo">
          <a href="/"><img src="/images/bgTransp-logoBlack.png" alt="Ekamvida Yoga" /></a>
        </div>
        <div className="mobile-menu-icon" onClick={handleMobileMenuClick}>
          <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars} />
        </div>
        <div className={`menu ${showMobileMenu ? 'show-mobile' : ''}`}>
          <ul>
            <li id="Yoga-Classes" className="dropdown-first">
              <a onClick={(e) => {e.preventDefault(); toggleDropdown('yoga');}}>
                Yoga Classes <span className="arrow" id="yoga-arrow">&#9662;</span>
              </a>
              <div className={`dropdown-content-first ${openDropdown === 'yoga' ? 'show' : ''}`}>
                <Link to="/ServicePage">Group Classes</Link>
                <a href="/privateclass">Private Classes</a>
              </div>
            </li>
            <li><a href="/Schedule">Schedule</a></li>
            <li><a href="/price">Pricing & Packages</a></li>
            <li><a href="/Contactus">Contact Us</a></li>
            <li><a href="/Faqs">FAQs</a></li>
            <li className="dropdown-first">
              <a onClick={(e) => {e.preventDefault(); toggleDropdown('explore');}}>
                Explore More <span className="arrow" id="explore-arrow">&#9662;</span>
              </a>
              <div className={`dropdown-content-first ${openDropdown === 'explore' ? 'show' : ''}`}>
                <a href="/Events">Events</a>
                <a href="/Blog">Blog</a>
                <a href="#">About Us</a>
              </div>
            </li>
          </ul>
        </div>
        <div className={`buttons ${showMobileMenu ? 'show-mobile' : ''}`}>
          {isAuthenticated ? (
            <>
            <Link to="/AccountPage">
              <button onClick={handleAccountMenuClick} className="login-register-nav">
                <FontAwesomeIcon className='fontawesome' icon={faCircleUser} />
                My Account
              </button>
              </Link>
            </>
          ) : (
            <Link to="/LoginPage">
              <button className="login-register-nav">Login/Register</button>
            </Link>
          )}
          <button className="join-classes-nav">Join our classes</button>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;