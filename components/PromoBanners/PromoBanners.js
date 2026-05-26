import React from 'react';
import './PromoBanners.css';


const PromoBanners = () => {
  const banners = [
    {
      id: 'furniture',
      title: 'FURNITURE',
      subtitle: '30-40% Discount',
      image: '/assets/images/furniture.png', // User to provide
      type: 'large',
      button: 'Shop now'
    },
    {
      id: 'clocks',
      title: 'CLOCKS',
      subtitle: '814 Products',
      image: '/assets/images/clocks.png', // User to provide
      type: 'small'
    },
    {
      id: 'toys',
      title: 'TOYS',
      subtitle: '719 Products',
      image: '/assets/images/toys.png', // User to provide
      type: 'small'
    },
    {
      id: 'lighting',
      title: 'LIGHTING',
      subtitle: '423 Products',
      image: '/assets/images/lighting.png', // User to provide
      type: 'small'
    },
    {
      id: 'accessories',
      title: 'ACCESSORIES',
      subtitle: '528 Products',
      image: '/assets/images/accessories.png', // User to provide
      type: 'small'
    }
  ];

  return (
    <div className="container promoWrapper">
      <div className="promoGrid">
        {banners.map((banner) => (
          <div key={banner.id} className={`promoItem ${banner.id} ${banner.type}`}>
            <div className="promoContent">
              <h3 className="bannerTitle Poppins-semi-bold">{banner.title}</h3>
              <h3 className="bannerSubtitle Poppins-semi-bold">{banner.subtitle}</h3>
              {banner.button && <button className="shopNowBtn">{banner.button}</button>}
            </div>
            {/* Image component with relative container */}
            <div className="bannerImageWrapper">
               <img src={banner.image} alt={banner.title} className="bannerImg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBanners;
