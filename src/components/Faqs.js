import React, { useEffect } from 'react';
import Navbar from './Navbar'
import './Faqs.css'
import Header from './Header';

const Faqs = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll('.faq button');
    
    const handleButtonClick = (event) => {
      const button = event.currentTarget;
      const faq = button.parentElement;
      const isExpanded = faq.getAttribute('aria-expanded') === 'true';
  
      // Toggle the expanded state
      faq.setAttribute('aria-expanded', !isExpanded);

      // Toggle the button image (plus or minus)
      const img = button.querySelector('img');
      img.src = isExpanded ? 'images/plus.svg' : 'images/minus.svg';
  
      // Toggle the FAQ content visibility with smooth scrolling
      const content = faq.querySelector('.faq-content');
      if (content) {
        if (isExpanded) {
          content.style.maxHeight = '0'; // Collapse content
        } else {
          content.style.maxHeight = content.scrollHeight + 'px'; // Expand content
        }
      }
    };

    // Add click event listener to each button
    buttons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
    });

    // Cleanup event listeners on unmount
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', handleButtonClick);
      });
    };
  }, []);


    
  return (
    <div>
        <Navbar/>
        <div className="hero-faqs">
        <div className="hero-text-faqs">
        <div class="logo4-faqs">
            <img src="images/background-2.svg" alt="Logo"/>
        </div>
          <h1>Frequently Asked Questions</h1>
        </div>
      </div>
      <div class="container-faqs">
        <div class="left-container-faqs">
        <div className="decorative-faqs-right">
        <img src='images/background-2.svg' alt="Decorative element" />
      </div>
            <h1>Frequently-Asked Questions</h1>
            <p>Everyone's wellness journey is different. If you're having questions about where to start, check out our FAQ's for answers.</p>
            <h1 className='Questions'>Questions unanswered?</h1>
            <p className='Reach-out'>Reach out to us via our contact form or through the contact information listed on our page.</p>
            <a href="#" class="contact-button-fqas">Contact us</a>
        </div>
        <div class="right-container-faqs">
          <div class="faq" aria-expanded="true">
            <button aria-expanded="true">
             <img src='images/minus.svg'/>
              Are your classes suitable for total beginners?
            </button>
            <div className='divider-sec'></div>
            <div class="faq-content">
              <p>Here is where you can insert an extended answer to each of these frequently-asked questions. The answer can be as detailed as you like, since it will expand and collapse as users click through questions. Answers are hidden by default so that the page is easier to view at first. If the answers in this FAQ section aren't sufficient, users can always reach out via the contact information or contact form provided on the website, so it should be pretty easy to handle any kind of request from any visitor on the website.</p>
            </div>
          </div>
          <div class="faq">
            <button aria-expanded="false">
              <img src='images/plus.svg'/>
              Do you offer private sessions?
            </button>
            <div className='divider-sec'></div>
            <div class="faq-content">
              <p>Here is where you can insert an extended answer to each of these frequently-asked questions. The answer can be as detailed as you like, since it will expand and collapse as users click through questions. Answers are hidden by default so that the page is easier to view at first. If the answers in this FAQ section aren’t sufficient, users can always reach out via the contact information or contact form provided on the website, so it should be pretty easy to handle any kind of request from any visitor on the website</p>
            </div>
          </div>
          <div class="faq" aria-expanded="false">
            <button aria-expanded="false">
              <img src='images/plus.svg'/>
              How do I choose which yoga class is best for me?
            </button>
            <div className='divider-sec'></div>
            <div class="faq-content">
              <p>Here is where you can insert an extended answer to each of these frequently-asked questions. The answer can be as detailed as you like, since it will expand and collapse as users click through questions. Answers are hidden by default so that the page is easier to view at first. If the answers in this FAQ section aren't sufficient, users can always reach out via the contact information or contact form provided on the website, so it should be pretty easy to handle any kind of request from any visitor on the website.</p>
            </div>
          </div>
          <div class="faq" aria-expanded="false">
            <button aria-expanded="false">
              <img src='images/plus.svg'/>
              Do you offer corporate packages?
            </button>
            <div className='divider-sec'></div>
            <div class="faq-content">
              <p>Here is where you can insert an extended answer to each of these frequently-asked questions. The answer can be as detailed as you like, since it will expand and collapse as users click through questions. Answers are hidden by default so that the page is easier to view at first. If the answers in this FAQ section aren't sufficient, users can always reach out via the contact information or contact form provided on the website, so it should be pretty easy to handle any kind of request from any visitor on the website.</p>
            </div>
          </div>
          <div class="faq" aria-expanded="false">
            <button aria-expanded="false">
              <img src='images/plus.svg'/>
              Do I need to bring my own mat or other equipment?
            </button>
            <div className='divider-sec'></div>
            <div class="faq-content">
              <p>Here is where you can insert an extended answer to each of these frequently-asked questions. The answer can be as detailed as you like, since it will expand and collapse as users click through questions. Answers are hidden by default so that the page is easier to view at first. If the answers in this FAQ section aren't sufficient, users can always reach out via the contact information or contact form provided on the website, so it should be pretty easy to handle any kind of request from any visitor on the website.</p>
            </div>
          </div>
          <div class="faq" aria-expanded="false">
            <button aria-expanded="false">
              <img src='images/plus.svg'/>
              What is your class booking policy?
            </button>
            <div className='divider-sec'></div>
            <div class="faq-content">
              <p>Here is where you can insert an extended answer to each of these frequently-asked questions. The answer can be as detailed as you like, since it will expand and collapse as users click through questions. Answers are hidden by default so that the page is easier to view at first. If the answers in this FAQ section aren't sufficient, users can always reach out via the contact information or contact form provided on the website, so it should be pretty easy to handle any kind of request from any visitor on the website.</p>
            </div>
          </div>
          <div class="faq" aria-expanded="false">
            <button aria-expanded="false">
              <img src='images/plus.svg'/>
              What is your bad weather policy?
            </button>
            <div className='divider-sec'></div>
            <div class="faq-content">
              <p>Here is where you can insert an extended answer to each of these frequently-asked questions. The answer can be as detailed as you like, since it will expand and collapse as users click through questions. Answers are hidden by default so that the page is easier to view at first. If the answers in this FAQ section aren’t sufficient, users can always reach out via the contact information or contact form provided on the website, so it should be pretty easy to handle any kind of request from any visitor on the website</p>
            </div>
          </div>
          <div class="faq" aria-expanded="false">
            <button aria-expanded="false">
              <img src='images/plus.svg'/>
              What is your class waitlist policy?
            </button>
            <div className='divider-sec'></div>
            <div class="faq-content">
              <p>Here is where you can insert an extended answer to each of these frequently-asked questions. The answer can be as detailed as you like, since it will expand and collapse as users click through questions. Answers are hidden by default so that the page is easier to view at first. If the answers in this FAQ section aren’t sufficient, users can always reach out via the contact information or contact form provided on the website, so it should be pretty easy to handle any kind of request from any visitor on the website</p>
            </div>
          </div>
          <div class="faq" aria-expanded="false">
            <button aria-expanded="false">
              <img src='images/plus.svg'/>
              What is your cancellation or late-comer policy?
            </button>
            <div className='divider-sec'></div>
            <div class="faq-content">
              <p>Here is where you can insert an extended answer to each of these frequently-asked questions. The answer can be as detailed as you like, since it will expand and collapse as users click through questions. Answers are hidden by default so that the page is easier to view at first. If the answers in this FAQ section aren’t sufficient, users can always reach out via the contact information or contact form provided on the website, so it should be pretty easy to handle any kind of request from any visitor on the website</p>
            </div>
          </div>
        </div>
    </div>
   <Header />
      
    </div>
  )
}

export default Faqs
