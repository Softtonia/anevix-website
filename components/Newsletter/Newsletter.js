import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <div className="sub-container newsletterWrapper">
      <div className="newsletterContent">
        <div className="newsletterInfo">
          <h2 className="Poppins-bold">Stay Updated with Latest Deals & Offers</h2>
          <h4 className="Poppins-regular">
            Subscribe to get exclusive discounts, new <br/> arrivals & special offers.
          </h4>
          
          <div className="downloadSection">
            <h4 className="Poppins-medium">Download Now</h4>
            <div className="appButtons">
              <button className="storeBtn">
                <img src="/assets/images/google-play.png" alt="Google Play" />
              </button>
              <button className="storeBtn">
                <img src="/assets/images/app-store.png" alt="App Store" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="newsletterImage">
          <img src="/assets/images/newsletter-person.png" alt="Special Offers" />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
