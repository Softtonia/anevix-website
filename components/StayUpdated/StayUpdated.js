import React from 'react';
import './StayUpdated.css';

const StayUpdated = () => {
  return (
    <div className="stayUpdatedWrapper">
      <div className="stayUpdatedContent">
        <div className="stayUpdatedInfo">
          <h2 className="Poppins-bold">Stay Updated with Latest Deals & Offers</h2>
          <h4 className="Poppins-regular">
            Subscribe to get exclusive discounts, new <br /> arrivals & special offers.
          </h4>

          <div className="downloadSection">
            <h4 className="Poppins-medium">Download Now</h4>
            <div className="appButtons">
              <button className="storeBtn" aria-label="Google Play">
                <img src="/assets/images/google-play.png" alt="Google Play" />
              </button>
              <button className="storeBtn" aria-label="App Store">
                <img src="/assets/images/app-store.png" alt="App Store" />
              </button>
            </div>
          </div>
        </div>

        <div className="stayUpdatedImage">
          <img src="/assets/images/newsletter-person.png" alt="Special Offers" />
        </div>
      </div>
    </div>
  );
};

export default StayUpdated;
