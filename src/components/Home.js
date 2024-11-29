import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import { Link } from 'react-router-dom';
import './TestimonialSection.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';





const API_URL = 'http://localhost:5000/api/testimonials';

const Home = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Assuming `user` is part of the auth context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [form, setForm] = useState({ name: '', message: '' });
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navbarRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleMouseEnter = (dropdownName) => {
    setOpenDropdown(dropdownName);
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setOpenDropdown(null);
    setIsHovered(false);
  };




  // document.addEventListener('DOMContentLoaded', function() {
  //   const menuIcon = document.querySelector('.menu-icon');
  //   const mobileMenu = document.querySelector('.mobile-menu');
  //   const closeIcon = document.querySelector('.close-icon');
  
  //   if (menuIcon && mobileMenu && closeIcon) {
  //     menuIcon.addEventListener('click', () => {
  //       mobileMenu.classList.add('active');
  //     });
  
  //     closeIcon.addEventListener('click', () => {
  //       mobileMenu.classList.remove('active');
  //     });
  //   } else {
  //     console.error('One or more elements are missing from the DOM');
  //   }
  // });


  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    // Get the menu icon element

    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(API_URL);
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
  };

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      setForm({ name: '', message: '' });
      closeModal();
      fetchTestimonials();
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    }
  };

  const handleAccountMenuClick = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  const handleOutsideClick = (e) => {
    if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
      setShowAccountMenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-first')) {
        setOpenDropdown(prevDropdown => {
          if (prevDropdown) {
            document.getElementById(`${prevDropdown}-arrow`).style.transform = 'rotate(0deg)';
          }
          return null;
        });
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
        document.getElementById(`${dropdownName}-arrow`).style.transform = 'rotate(0deg)';
        return null;
      } else {
        if (prevDropdown) {
          document.getElementById(`${prevDropdown}-arrow`).style.transform = 'rotate(0deg)';
        }
        document.getElementById(`${dropdownName}-arrow`).style.transform = 'rotate(180deg)';
        return dropdownName;
      }
    });
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-first')) {
        setOpenDropdown(null);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Select elements
      const navbar = document.getElementById('navbar-first');
      const links = document.querySelectorAll('.menu-first a');
      const loginRegisterButton = document.querySelector('.login-register-first');
      const defaultLogo = document.getElementById('logo-default-first');
      const scrollLogo = document.getElementById('logo-scroll-first');
  
      // Null checks
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
  
      if (links.length > 0) {
        links.forEach(link => {
          if (window.scrollY > 50) {
            link.classList.add('scrolled-link');
          } else {
            link.classList.remove('scrolled-link');
          }
        });
      }
  
      if (loginRegisterButton) {
        if (window.scrollY > 50) {
          loginRegisterButton.classList.add('scrolled-button');
        } else {
          loginRegisterButton.classList.remove('scrolled-button');
        }
      }
  
      if (defaultLogo && scrollLogo) {
        if (window.scrollY > 50) {
          defaultLogo.style.display = 'none';
          scrollLogo.style.display = 'block';
        } else {
          defaultLogo.style.display = 'block';
          scrollLogo.style.display = 'none';
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  useEffect(() => {
    const classCards = document.querySelectorAll('.class-card');
    
    classCards.forEach(card => {
      const img = card.querySelector('img');
      const button = card.querySelector('button');
      const header = card.querySelector('h3');
  
      const onMouseEnter = () => {
        img.style.transform = 'scale(1.1)';
        button.style.borderColor = '#7B7092';
        button.style.borderWidth = '3px';  // Set border width to 3px on hover
        header.style.color = '#7B7092';
      };
  
      const onMouseLeave = () => {
        img.style.transform = 'scale(1)';
        button.style.borderColor = 'initial'; // Reset border color
        button.style.borderWidth = '1px';  // Reset border width to the default
        header.style.color = 'initial';
      };
  
      img.addEventListener('mouseenter', onMouseEnter);
      img.addEventListener('mouseleave', onMouseLeave);
      button.addEventListener('mouseenter', onMouseEnter);
      button.addEventListener('mouseleave', onMouseLeave);
  
      return () => {
        img.removeEventListener('mouseenter', onMouseEnter);
        img.removeEventListener('mouseleave', onMouseLeave);
        button.removeEventListener('mouseenter', onMouseEnter);
        button.removeEventListener('mouseleave', onMouseLeave);
      };
    });
  }, []);
  
  

  useEffect(() => {
    const slider = document.querySelector('.classes');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (!slider) {
      console.error('Slider element not found');
      return;
    }

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    const cardWidth = slider.querySelector('.class-card').offsetWidth;
    const visibleCards = Math.floor(slider.clientWidth / cardWidth);

    const handlePrevClick = () => {
      slider.scrollBy({
        left: -cardWidth * visibleCards,
        behavior: 'smooth'
      });
    };

    const handleNextClick = () => {
      slider.scrollBy({
        left: cardWidth * visibleCards,
        behavior: 'smooth'
      });
    };

    prevBtn.addEventListener('click', handlePrevClick);
    nextBtn.addEventListener('click', handleNextClick);

    const updateButtonStates = () => {
      prevBtn.disabled = slider.scrollLeft <= 0;
      nextBtn.disabled = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;
    };

    slider.addEventListener('scroll', updateButtonStates);
    window.addEventListener('resize', updateButtonStates);

    updateButtonStates();

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
      prevBtn.removeEventListener('click', handlePrevClick);
      nextBtn.removeEventListener('click', handleNextClick);
      slider.removeEventListener('scroll', updateButtonStates);
      window.removeEventListener('resize', updateButtonStates);
    };
  }, []);

  useEffect(() => {
    const section = document.querySelector('.instagram-section');
    const feed = document.querySelector('.instagram-feed');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    const scrollButton = document.getElementById('scrollButton');
    let isAtStart = true;
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    const handleScrollButtonClick = () => {
      const feedWidth = feed.scrollWidth;
      const containerWidth = feed.clientWidth;

      if (isAtStart) {
        // Scroll to end
        feed.scrollTo({
          left: feedWidth - containerWidth,
          behavior: 'smooth'
        });
        scrollButton.innerHTML = '&lt;';
        scrollButton.classList.add('left');
      } else {
        // Scroll to start
        feed.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
        scrollButton.innerHTML = '&gt;';
        scrollButton.classList.remove('left');
      }

      isAtStart = !isAtStart;
    };

    const handlePrevButtonClick = () => {
      feed.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    };

    const handleNextButtonClick = () => {
      feed.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    };

    const handleMouseEnter = () => {
      feed.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      feed.style.cursor = 'default';
    };

    const handleMouseDown = (e) => {
      isMouseDown = true;
      feed.style.cursor = 'grabbing';
      startX = e.pageX - feed.offsetLeft;
      scrollLeft = feed.scrollLeft;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      feed.style.cursor = 'grab';
    };

    const handleMouseMove = (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - feed.offsetLeft;
      const walk = (x - startX) * 2; // Adjust sliding speed
      feed.scrollLeft = scrollLeft - walk;
    };

    scrollButton.addEventListener('click', handleScrollButtonClick);
    if (prevButton) {
      prevButton.addEventListener('click', handlePrevButtonClick);
    }
    if (nextButton) {
      nextButton.addEventListener('click', handleNextButtonClick);
    }
    feed.addEventListener('mouseenter', handleMouseEnter);
    feed.addEventListener('mouseleave', handleMouseLeave);
    feed.addEventListener('mousedown', handleMouseDown);
    feed.addEventListener('mouseup', handleMouseUp);
    feed.addEventListener('mousemove', handleMouseMove);

    // Log to console for debugging
    console.log('Prev button:', prevButton);
    console.log('Next button:', nextButton);

    return () => {
      scrollButton.removeEventListener('click', handleScrollButtonClick);
      if (prevButton) {
        prevButton.removeEventListener('click', handlePrevButtonClick);
      }
      if (nextButton) {
        nextButton.removeEventListener('click', handleNextButtonClick);
      }
      feed.removeEventListener('mouseenter', handleMouseEnter);
      feed.removeEventListener('mouseleave', handleMouseLeave);
      feed.removeEventListener('mousedown', handleMouseDown);
      feed.removeEventListener('mouseup', handleMouseUp);
      feed.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);





  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0 || isMobileMenuOpen;
      setIsScrolled(scrolled);
      
      if (navbarRef.current) {
        if (scrolled) {
          navbarRef.current.classList.add('scrolled');
        } else {
          navbarRef.current.classList.remove('scrolled');
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    // Trigger the effect when isMobileMenuOpen changes
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]); // Add isMobileMenuOpen as a dependency




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  const handleMobileMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Apply or remove the scrolled class based on the mobile menu and scroll state
    if (navbarRef.current) {
      if (!showMobileMenu) {
        navbarRef.current.classList.add('scrolled');
      } else {
        // Only remove the 'scrolled' class if we're not actually scrolled
        if (window.scrollY === 0) {
          navbarRef.current.classList.remove('scrolled');
        }
      }
    }
  };
  

  return (
    <>
    <nav id="navbar-first" ref={navbarRef} className={isScrolled || isHovered ? 'scrolled' : ''}>
      <div className="navbar-first">
        <div className="logo-first">
          <Link to="/">
            <img
              src="images/bgTransp-logoWhite.png"
              alt="Ekamvida Yoga"
              id="logo-default-first"
              style={{ display: isScrolled || isHovered ? 'none' : 'block' }}
            />
            <img
              src="images/bgTransp-logoBlack.png"
              alt="Ekamvida Yoga"
              id="logo-scroll-first"
              style={{ display: isScrolled || isHovered ? 'block' : 'none' }}
            />
          </Link>
        </div>
        <div className="mobile-menu-icon" onClick={handleMobileMenuClick}>
          <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars}
          className={isScrolled || showMobileMenu ? 'icon-scrolled' : ''} />
        </div>
        <div className={`menu-first ${showMobileMenu ? 'show-mobile' : ''}`}>
          <ul>
            <li
              id="Yoga-Classes"
              className="dropdown-first"
              onMouseEnter={() => handleMouseEnter('yoga')}
              onMouseLeave={handleMouseLeave}
            >
              <a href="/" onClick={(e) => { e.preventDefault(); toggleDropdown('yoga'); }}>
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
            <li
              className="dropdown-first"
              onMouseEnter={() => handleMouseEnter('explore')}
              onMouseLeave={handleMouseLeave}
            >
              <a href="/" onClick={(e) => { e.preventDefault(); toggleDropdown('explore'); }}>
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
        <div className={`buttons-first ${showMobileMenu ? 'show-mobile' : ''}`}>
          {isAuthenticated ? (
            <>
            <Link to="/AccountPage">
              <button onClick={handleAccountMenuClick} className="login-register-first">
                <FontAwesomeIcon icon={faCircleUser} />
                My Account
              </button>
              </Link>
            </>
          ) : (
            <Link to="/LoginPage">
              <button className="login-register-first">Login/Register</button>
            </Link>
          )}
          <button className="join-classes-first">Join our classes</button>
        </div>
      </div>
    </nav>

            <div className="hero-first">
              <div className="hero-text-first">
                <h1><span>Your body</span> is your temple </h1>
                <p> <span>Begin your journey and unlock</span> a new level of feeling good</p>
                <a href="#">Check out our yoga classes <img className='ct-arrow-right' src='images/arrow-right.svg' /></a>
                <div class="logo3">
            <img src="images/logo3.svg" alt="Logo"/>
        </div>
              </div>
            </div>
            <div className="section-first">
              <div className="section-content-first">
                <div className="text-container-first">
                  <div className="left-content-first">
                    <h1>Yoga for all,<br />from beginner <br/> to advanced</h1>
                  </div>
                  <div className="right-content-first">
                    <p>Health and wellness is a journey of the physical, emotional, mental, and spiritual. Finding a unique space to focus on yourself, inwardly and outwardly, can be challenging.</p>
                    <p>GLYoga is a yoga and wellness community welcoming people from any background to join and begin their journey to a healthier, more fulfilled lifestyle. Led by us -- Georgia and Krishna, a dynamic duo of yoga instructors -- our mission is to create a space that promotes respect, inclusivity, and ultimately growth.</p>
                    <a href="#" className="ct-button">See what classes we offer <img className='ct-arrow-right' src='images/arrow-right.svg' /></a>
                  </div>
                </div>
                <div className="decorative-element-left">
                  <img src='images/background-1 (2).svg' alt="Decorative element" />
                </div>

                <div className="decorative-element-right">
                  <img src='images/background-1 (2).svg' alt="Decorative element" />
                </div>
              </div>
              </div>
           
            <div className="class-moving">
              <div className="header">
                <h1>Classes that get you moving</h1>
                <p>
                  Yoga classes we offer
                  <span>
                  <button className="nav-btn" id="prev-btn"><img className='arrow-right' src='images/arrow-left.svg' /> </button>
                  <button className="nav-btn" id="next-btn"><img className='arrow-right' src='images/arrow-right.svg' /></button>
                  </span>

                </p>
              </div>
              <div className="classes">
              <div className="decorative-element-left">
                  <img src='images/background-1 (2).svg' alt="Decorative element" />
                </div>

                <div className="decorative-element-right">
                  <img src='images/background-1 (2).svg' alt="Decorative element" />
                </div>
                <div className="class-card">
                  <div className='class-card-header'>
                  <h3>Hatha Yoga Classes</h3>
                  <p>Hatha yoga is a branch of yoga which uses physical techniques and movement to promote energy and strength.</p>
                  </div>

                  <img src="images/Hath-Yoga.png" alt="Hatha Yoga" />
                  <button>More about this class
                    <img className='arrow-right' src='images/arrow-right.svg' />
                  </button>
                </div>
                <div className="class-card">
                <div className='class-card-header'>
                  <h3>Yin Yoga Classes</h3>
                  <p>Yin yoga is a slow-paced style of yoga aimed at relaxation, derived from principles of traditional Chinese medicinal practice.</p>
                  </div>
                  <img src="images/vinyasan-yoga.png" alt="Yin Yoga" />
                  <button>More about this class
                   <img className='arrow-right' src='images/arrow-right.svg' />
                  </button>
                </div>
                <div className="class-card">
                <div className='class-card-header'>
                  <h3>Vinyasa Yoga Classes</h3>
                  <p>A dynamic and fast-paced style of yoga that will test your strength and stamina. This physically challenging class will make you work up a sweat. </p>
                  </div>
                  <img src="images/pexels-yan-krukau-8436616 1.png" alt="Yin Yoga" />
                  <button>More about this class
                    <img className='arrow-right' src='images/arrow-right.svg' />
                  </button>
                </div>
                <div className="class-card">
                <div className='class-card-header'>
                  <h3>Yin-Yang Yoga Classes</h3>
                  <p>30 minutes of dynamic heating flow to stimulate sun energy (yang) followed by 30 minutes of cooling yin postures to relax and restore,  </p>
                  </div>
                  <img src="images/yin-yan-yoga.jpg" alt="Yin Yoga" />
                  <button>More about this class
                    <img className='arrow-right' src='images/arrow-right.svg' />
                  </button>
                </div>
                <div className="class-card">
                <div className='class-card-header'>
                  <h3>Guided Meditation Sessions</h3>
                  <p>Meditation helps us to become mindful and present. Our guided sessions will help you to find peace and clarity. </p>
                  </div>
                  <img src="images/Guidded-meditations.jpg" alt="Yin Yoga" />
                  <button>More about this class
                   <img className='arrow-right' src='images/arrow-right.svg' />
                  </button>
                </div>
                <div className="class-card">
                <div className='class-card-header'>
                  <h3>Pranayama Practice</h3>
                  <p>In this class, our experienced instructors will help you develop breath awareness as they guide you through various breathing techniques  </p>
                  </div>
                  <img src="images/paranyam.jpg" alt="Yin Yoga" />
                  <button>More about this class
                    <img className='arrow-right' src='images/arrow-right.svg' />
                  </button>
                </div>

                <div className="class-card">
                <div className='class-card-header'>
                  <h3>Prenatal Yoga</h3>
                  <p>The primary focus during pregnancy is relaxation and preparation for birth. This class involves gentle stretches, breathwork, meditation. </p>
                  </div>
                  <img src="images/prental.jpg" alt="Vinyasa Yoga" />
                  <button>More about this class
                    <img className='arrow-right' src='images/arrow-right.svg' />
                  </button>
                </div>
                <div className="class-card">
                <div className='class-card-header'>
                  <h3>Yoga Therapy</h3>
                  <p>Yoga can be used as a therapeutic and holistic way of healing from illnesses & injuries. Recommended: 1-on-1 practice</p>
                  </div>
                  <img src="images/Yoga-therpay.jpg" alt="Vinyasa Yoga" />
                  <button>More about this class
                  <img className='arrow-right' src='images/arrow-right.svg' />
                  </button>
                </div>
                <div className="class-card">
                <div className='class-card-header'>
                  <h3>Yoga Wheel Classes</h3>
                  <p>a fun and dynamic class using the yoga wheel prop to support and challenge the poses. Emphasis on spinal rolling.</p>
                  </div>
                  <img src="images/wheel-02.jpg" alt="Vinyasa Yoga" />
                  <button>More about this class
                    <img className='arrow-right' src='images/arrow-right.svg' />
                  </button>
                </div>
                <div className="class-card">
                <div className='class-card-header'>
                  <h3>Inversion Practice</h3>
                  <p>This class will help you to gradually build up the required body strength and confidence to master inversions like headstand, shoulder stand. </p>
                  </div>
                  <img src="images/handstand-02.jpg" alt="Vinyasa Yoga" />
                  <button>More about this class
                    <img className='arrow-right' src='images/arrow-right.svg' />
                  </button>
                </div>
              </div>
            </div>
            <div class="chat-section">
              <div class="chat-container">
                <div class="chat-text">
                  Not sure where to start? Get in touch with us to get the perfect suggestion for you
                </div>
                <a href="/ChatQueryForm" class="chat-button">
                  Chat with us <img className='arrow-right' src='images/arrow-right.svg' />
                </a>
              </div>
            </div>
            <div class="container-grid">
            <div className="decorative-elements-left">
                  <img src='images/background-1 (2).svg' alt="Decorative element" />
                </div>

                <div className="decorative-elements-right">
                  <img src='images/background-1 (2).svg' alt="Decorative element" />
                </div>
            
              
        <header>
            <h1>Create your own space to grow</h1>
            <p>Embark on your wellness journey and start feeling like a brand new you - <br/>
               check out our yoga classes, retreats, events, and much more</p>
        </header>
        <div class="grid-g">
            <div class="card-g">
                <img src="images/halfmoon-03 (1).jpg" alt="All Classes"/>
                <div class="card-content-g">
                    <h2>All Classes</h2>
                    <p>Find the right yoga or wellness practice from the 10+ styles we offer</p>
                    <a href="#" class="btn-g">Check out our classes <img className='arrow-check' src='images/arrow-right.svg'/></a>
                </div>
            </div>
            <div class="card-g">
                <img src="images\cobra-03.jpg" alt="Schedules"/>
                <div class="card-content-g">
                    <h2>Schedules</h2>
                    <p>We display our class schedules online for smooth and simple booking</p>
                    <a href="#" class="btn-g">View our full schedule <img className='arrow-check' src='images/arrow-right.svg'/></a>
                </div>
            </div>
            <div class="card-g">
                <img src="images/wildthing-01.jpg" alt="Pricing & Packages"/>
                <div class="card-content-g">
                    <h2>Pricing & Packages</h2>
                    <p>Browse our pricing range, or speak to us for hyper-flexible package offers</p>
                    <a href="#" class="btn-g">See packages we offer <img className='arrow-check' src='images/arrow-right.svg'/></a>
                </div>
            </div>
            <div class="card-g">
                <img src="
                images/forearmstand-01.jpg" alt="Upcoming Events"/>
                <div class="card-content-g">
                    <h2>Upcoming Events</h2>
                    <p>We keep our community strong and thriving - come meet us at our events</p>
                    <a href="#" class="btn-g">Join our events <img className='arrow-check' src='images/arrow-right.svg'/></a>
                </div>
            </div>
        </div>
    </div>
    <div className="testimonial-container">
      <h3>Kind words from our community</h3>
      <div className="testimonial-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-slide">
            <p>{testimonial.message}</p>
            <div className="author">- {testimonial.name}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? 'active' : ''}
            onClick={() => handlePaginationClick(index)}
          ></span>
        ))}
      </div>
      <div className="share-btn">
        <button onClick={handleShareClick}>Share your thoughts</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>×</button>
            <h2>Share Your Thoughts</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={form.name} onChange={handleInputChange} required />
              </label>
              <label>
                Message:
                <textarea name="message" value={form.message} onChange={handleInputChange} required></textarea>
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
      <div class="instagram-section">
      <div className="decorative-instagram-left">
      <img src='images/background-1 (2).svg' alt="Decorative element" />
    </div>

    <div className="decorative-instagram-right">
      <img src='images/background-1 (2).svg' alt="Decorative element" />
    </div>
    <div className='instagram-header'>
    <h2>Check us out on Instagram</h2>
    <p>Follow us @georgia.kp.yoga</p>
    </div>

    <div class="instagram-feed">
        <div class="instagram-overlay">
            <img src="images/10.png" alt="Instagram Image 3"/>
            <div class="overlay">
                <div class="instagram-text">
                    <img src="images/style=Colour.svg" alt="Instagram Logo" style={{height:'50px', width:'50px'}}/>
                    <p>@georgia.kp.yoga</p>
                </div>
            </div>
        </div>
        <div class="instagram-overlay">
            <img src="images/09.png" alt="Instagram Image 3"/>
            <div class="overlay">
                <div class="instagram-text">
                    <img src="images/style=Colour.svg" alt="Instagram Logo" style={{height:'50px', width:'50px'}} />
                    <p>@georgia.kp.yoga</p>
                </div>
            </div>
        </div>
        <div class="instagram-overlay">
            <img src="images\08.png"/>
            <div class="overlay">
                <div class="instagram-text">
                    <img src="images/style=Colour.svg" alt="Instagram Logo" style={{height:'50px', width:'50px'}} />
                    <p>@georgia.kp.yoga</p>
                </div>
            </div>
    </div>
    <div class="instagram-overlay">
        <img src="images\07.png"/>
        <div class="overlay">
            <div class="instagram-text">
                <img src="images/style=Colour.svg" alt="Instagram Logo" style={{height:'50px', width:'50px'}}/>
                <p>@georgia.kp.yoga</p>
            </div>
        </div>
    </div>

    <div class="instagram-overlay">
        <img src="images\06.png"/>
        <div class="overlay">
            <div class="instagram-text">
                <img src="images/style=Colour.svg" alt="Instagram Logo" style={{height:'50px', width:'50px'}}/>
                <p>@georgia.kp.yoga</p>
            </div>
        </div>
    </div>
    <div class="instagram-overlay">
        <img src="images\05.png"/>
        <div class="overlay">
            <div class="instagram-text">
                <img src="images/style=Colour.svg" alt="Instagram Logo" style={{height:'50px', width:'50px'}}/>
                <p>@georgia.kp.yoga</p>
            </div>
        </div>
    </div>
    <div class="instagram-overlay">
            <img src="https://s3-alpha-sig.figma.com/img/8032/e613/d59c726b8d295bb4d16c898f51a3c075?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OgnyWs-kxFZg9oTZMhY0UiG1cMfjQ579ZdnOZRVL74dnh8lieJVVrsKifPFqf-WFORiXmSw~mug0DptNcxlVwSbEg8p6Gj7ziq2pOrBFn5r~mbUDQ9v0TPwL56IPFq5Y3Esl3WF7wjGdbnCpymGalN0hZD85BEcRKQFxY52Pkupad3KlFm05FzVEch8BXoqJXDtsMJGJEhh9dUqqaYfvM4iQlZlHQLLU-kQRRX5kvprGPsqi3rHd2Lu5iL6r50HliSyuUCuD8JjpULyYvOme43mIs04pjx3oHucxCtULIGp3jrvRkGc2FM6hI9m7X~c1Jh2uEioYZ7JwO0sWxbxPBw__"/>
            <div class="overlay">
                <div class="instagram-text">
                    <img src="images/style=Colour.svg" alt="Instagram Logo" style={{height:'50px', width:'50px'}} />
                    <p>@georgia.kp.yoga</p>
                </div>
            </div>
        </div>
        
        <div class="instagram-overlay">
            <img src="images\03.png"/>
            <div class="overlay">
                <div class="instagram-text">
                    <img src="images/style=Colour.svg" alt="Instagram Logo" style={{height:'50px', width:'50px'}} />
                    <p>@georgia.kp.yoga</p>
                </div>
            </div>
        </div>
        <div class="instagram-overlay">
            <img src="images\02.png" alt="Instagram Image 3"/>
            <div class="overlay">
                <div class="instagram-text">
                    <img src="images/style=Colour.svg" alt="Instagram Logo" style={{height:'50px', width:'50px'}} />
                    <p>@georgia.kp.yoga</p>
                </div>
            </div>
        </div>
        <div class="instagram-overlay">
            <img src="images\01.png"/>
            <div class="overlay">
                <div class="instagram-text">
                    <img src="images/style=Colour.svg" alt="Instagram Logo" style={{height:'50px', width:'50px'}} />
                    <p>@georgia.kp.yoga</p>
                </div>
            </div>
        </div>
        {/* <div class="instagram-overlay">
            <img src="images/09.png" alt="Instagram Image 3"/>
            <div class="overlay">
                <div class="instagram-text">
                    <img src="images/style=Colour.svg" alt="Instagram Logo" style={{height:'50px', width:'50px'}} />
                    <p>@georgia.kp.yoga</p>
                </div>
            </div>
        </div> */}
    <div>
        <button class="nav-button" id="scrollButton">&gt;</button>
    </div>
    </div>
</div>
      <div class="container6">
      <div className="decorative-header-left">
                  <img  src='images/background-2 (1).svg' alt="Decorative element" />
                </div>

                <div className="decorative-header-right">
                  <img src='images/background-2 (1).svg' alt="Decorative element" />
                </div>
              <div class="image-container-6">
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

<footer className="footer">
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
      
</>
  );
};

export default Home;
