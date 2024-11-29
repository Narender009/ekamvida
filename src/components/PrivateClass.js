import React from 'react'
import Navbar from './Navbar'
import './Private.css';
import Header from './Header';

const PrivateClass = () => {
  return (
    <div>
        <Navbar/>
        <div className="hero-triangle">
        <div className="hero-text-triangle">
        <div class="logo-triangle">
            <img src="images/background-2.svg" alt="Logo"/>
        </div>
          <h1>Private Classes</h1>
        </div>
      </div>
      <div class="private-class">
        <div class="private-class-grid">
            <div class="private-class-content">
                <div class="private-class-card">
                  
                <div className="decorative-private-class-left">
                    <img src='images/background-1 (2).svg' alt="Decorative element" />
                  </div>
                  <div className='para'>
                    <p>Do you want to practice in your own rhythm?</p>
                    <p>Do you want to dive deeper into certain asanas, meditation and breathing techniques?</p>
                    <p>Or maybe you're managing an injury, and are cautious with movement?</p>
                    <p>Whichever the case, our private yoga sessions might be suitable for you. Private classes are hyper-flexible arrangements tailored to individual yogis, which can be either a 1-on-1 or in small groups, in the comfort of your home or outdoors. During these sessions, we happily take time to answer all of your yoga-related questions, to work on your posture, and to give you thorough guidance that you can apply across different areas of your life, even outside of your yoga practice.</p>
                  </div>

                </div>
                <div class="card-first">
                    <h2 class="private-class-title-first">Benefits of private classes</h2>
                    <div class="private-class-benefits-grid">
                        <div class="private-class-benefit">
                            <img src="images/11.svg" alt="Yoga pose icon" class="icon" />
                            <p>Classes are tailored to your specific goals and needs, making them perfect for any level of practice.</p>
                        </div>
                        <div class="private-class-benefit">
                            <img src="images/23.svg" alt="Leaf icon" class="icon" />
                            <p>Private classes tend to encourage more consistency and dedication to your practice.</p>
                        </div>
                        <div class="private-class-benefit">
                            <img src="images/16.svg" alt="Yoga pose icon" class="icon" />
                            <p>As you progress with more endurance and flexibility, you'll be able to explore new dimensions in your yoga practice.</p>
                        </div>
                        <div class="private-class-benefit">
                            <img src="images/03.svg" alt="Leaf icon" class="icon" />
                            <p>You'll grow and develop a deeper understanding of yoga (asanas, philosophy, meditation and breath).</p>
                        </div>
                    </div>
                </div>
                <div class="card-second">
                <div className="decorative-card-second-right">
                    <img src='images/background-1 (2).svg' alt="Decorative element" />
                  </div>
                    <h2 class="private-class-title-second">Pricing</h2>
                    <div class="private-class-pricing">
                        <div class="price-first">
                            <p>Private | 1-on-1 <span>Contact our team to arrange</span></p>
                            <h3>HK$600 <span>per session</span></h3>
                        </div>
                        <div class="price-first">
                            <p>Private | Couple <span>Contact our team to arrange</span></p>
                            <h3>HK$800 <span>per session</span></h3>
                        </div>
                        <div class="price-first">
                            <p>Private | Group (3-4) <span>Contact our team to arrange</span></p>
                            <h3>HK$1,000 <span>per session</span></h3>
                        </div>
                        <div class="price-first">
                            <p>Private | Group (5-6) <span>Contact our team to arrange</span></p>
                            <h3>HK$1,250<span>per session</span></h3>
                        </div>
                        <div class="price-first">
                            <p>Corporate wellness package</p>
                            <h3>Contact our team to arrange</h3>
                        </div>
                    </div>
                    <p class="private-class-button-first">The rates include travel within Lantau Island only. For further distances, an additional travel fee applies. We charge a 20% deposit upfront. Please contact us via WhatsApp to tell us what you have in mind.</p>
                </div>
                <div class="card-third">
                <div className="decorative-card-third-side">
                <img src='images/background-2.svg' alt="Decorative element" />
              </div>
                <h2 class="private-class-title-third">How to make the most of private classes</h2>
                  <div className='card-third-title'>
                    <h3 class="private-class-subtitle">Think of your personal goals</h3>
                    <p>Yoga is as much about the mind as it is about the body and spirit - like anything in life, consistency and motivation is much easier to achieve if driven by a goal. These goals don’t have to be about losing weight or being active! They can be about anything - wanting to improve sleep, finding a moment of peace in a busy day, even just to have an activity that promotes movement and fun. Whatever your goal, which may or may not change with each session, it will inform your practice.</p>
                    <h3 class="private-class-subtitle">Shed your expectations</h3>
                    <p>Ironically, it’s a good habit to focus on goals but abandon expectations. Especially for private classes, where the environment centers around you, avoid holding expectations for yourself - no two days, and thus no two sessions, are the same, and letting go and experiencing the present moment is the real key to your growth. Moving into each class with an open mind allows you to fully embrace everything the session has to offer you.</p>
                  </div>

                </div>
            </div>
            <div class="private-class-sidebar">
                <div class="card-four">
                <div className="decorative-card-four-right">
                    <img src='images/background-2.svg' alt="Decorative element" />
                  </div>
                <h1>Important Information</h1>
                <p>All our yoga classes are conducted in <span class="highlight">English</span>.</p>
                <p>Class bookings and session updates are <span class="highlight">conducted through our WhatsApp group</span> - whether you're a new member of our community, or a returning yogi, please contact us to join.</p>
                <p>For private classes, session locations will be <span class="highlight">coordinated and finalized with instructors</span> during the booking process to fit clients' preference/convenience.</p>
                <a href="#" class="private-class-button">Join us on WhatsApp <img src="images/WhatsApp.svg" alt="WhatsApp"/></a>
                </div>
            </div>
        </div>
    </div>
      
   <Header />
 
 
      
    </div>
  )
}

export default PrivateClass
