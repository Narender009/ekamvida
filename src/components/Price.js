import React from 'react'
import Navbar from './Navbar'
import './Price.css'
import Header from './Header'

const Price = () => {
  return (
    <div>
        <Navbar/>
        <div className="hero-wildthing">
        <div className="hero-text-wildthing">
          <h1>Pricing & Packages</h1>
          <div className="logo-wildthing">
            <img src="images/background-2.svg" alt="Logo"/>
        </div>
        </div>
      </div>
      <div className="container-wrapper321 container123">
            <div className="container321 card123">
                <div className="section321" style={{border:'none'}}>
                    <h2 className="title123">NEW! Trials and offers</h2>
                    <div className="price-item321">
                        <span>Trial package - 2 classes</span>
                        <span className='or-dis-price'>
                            <span className="original-price321">HK$240</span> 
                            <span className="discounted-price321">HK$216</span>
                        </span>
                    </div>
                    <div className="price-item321">
                        <span>Trial package - 3 classes</span>
                        <span className='or-dis-price'>
                            <span className="original-price321">HK$360</span> 
                            <span className="discounted-price321">HK$324</span>
                        </span>
                    </div>
                    <div className="price-item-price">
                        <span>Single drop-in</span>
                        <span className="original-price321">HK$120</span>
                    </div>
                </div>
                <div class="section321">
                    <h2 class="title123">Monthly Pass</h2>
                    <div class="price-item321">
                        <span className='monthly-pass'>5-class pass <span class="note-month">1-month validity</span></span>
                        <span className="original-price321">HK$500</span>
                    </div>
                    <div class="price-item321">
                        <span className='monthly-pass'>Unlimited <span class="note-month">1-month validity</span></span>
                        <span className="original-price321">HK$850</span>
                    </div>
                </div>
                <div className='divider-first'></div>
               
                <div class="section321">
                    <h2 class="title123">Specialty Classes</h2>
                    <div class="price-item321">
                        <span>Yoga wheel</span>
                        <span className="original-price321">HK$150 <span>per session</span></span>
                    </div>
                    <div class="price-item321">
                        <span>Kids yoga</span>
                        <span className="original-price321">HK$150 <span>per session</span></span>
                    </div>
                </div>
                <div className='divider-first'></div>
                <div class="section321" style={{border:'none'}}>
                    <h2 class="title123">Private Classes</h2>
                    <div class="price-item321">
                        <span className='Private-1-on-1'>Private 1-on-1 <span class="note-month">Contact our team to arrange</span></span>
                        <span className="original-price321">HK$600 <span>per session</span> </span>
                    </div>
                    <div class="price-item321">
                        <span className='Private-1-on-1'>Private | Couple <span class="note-month">Contact our team to arrange</span></span>
                        <span className="original-price321">HK$800 <span>per session</span></span>
                    </div>
                    <div class="price-item321">
                        <span className='Private-1-on-1'>Private | Group (3-4) <span class="note-month">Contact our team to arrange</span></span>
                        <span className="original-price321">HK$1,000 <span>per session</span></span>
                    </div>
                    <div class="price-item321">
                        <span className='Private-1-on-1'>Private | Group (5-6) <span class="note-month">Contact our team to arrange</span></span>
                        <span className="original-price321">HK$1,250 <span>per session</span></span>
                    </div>
                    <div class="price-item321">
                        <span className='coprate' >Corporate wellness package <span class="note-month"></span></span>
                        <span className="original-price-co">Contact our team to arrange</span>
                    </div>
                </div>
            </div>
    
            <div class="container567">
                
                <h2>Important Information</h2>
                <p>All our yoga classes are conducted in <span class="highlight321">English</span>.</p>
                <p>Class bookings and session updates are <span class="highlight321">conducted through our WhatsApp group</span> - whether you’re a new member of our community, or a returning yogi, please contact us to join.</p>
                <p><span class="highlight-blue321">Class locations vary for each session - </span> <br/>the most updated information can be found <br/>in our WhatsApp group, please contact us to join.</p>
                <a href="#" class="button321">Join us on WhatsApp <img src="images/WhatsApp.svg" alt="WhatsApp Icon" width="20"/></a>
                <div className="decorative-card-four-right">
                    <img src='images/background-2.svg' alt="Decorative element" />
            </div>
                  
            </div>
           
        </div>
        <Header />
      
    </div>
  )
}

export default Price
