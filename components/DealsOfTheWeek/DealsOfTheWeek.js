import React from 'react';
import './DealsOfTheWeek.css';
import CountdownStyle1 from '@/utils/CountdownStyle1/CountdownStyle1';

const DealsOfTheWeek = () => {
  const deals = [
    {
      id: 1,
      brand: 'Aeroline Pro Chair',
      name: 'Jet Black with Amber Stitch',
      rating: 4.8,
      oldPrice: 'Rs 9999/-',
      newPrice: 'Rs 7999/-',
      image: '/assets/images/chair1.png',
      timer: { days: '02', hours: '10', mins: '20', secs: '50' }
    },
    {
      id: 2,
      brand: 'Aeroline Pro Chair',
      name: 'Jet Black with Amber Stitch',
      rating: 4.8,
      oldPrice: 'Rs 9999/-',
      newPrice: 'Rs 7999/-',
      image: '/assets/images/chair2.png',
    },
    {
      id: 3,
      brand: 'Aeroline Pro Chair',
      name: 'Jet Black with Amber Stitch',
      rating: 4.8,
      oldPrice: 'Rs 9999/-',
      newPrice: 'Rs 7999/-',
      image: '/assets/images/chair3.png',
    },
    {
      id: 4,
      brand: 'Aeroline Pro Chair',
      name: 'Jet Black with Amber Stitch',
      rating: 4.8,
      oldPrice: 'Rs 9999/-',
      newPrice: 'Rs 7999/-',
      image: '/assets/images/chair4.png',
    },
    {
      id: 5,
      brand: 'Aeroline Pro Chair',
      name: 'Jet Black with Amber Stitch',
      rating: 4.8,
      oldPrice: 'Rs 9999/-',
      newPrice: 'Rs 7999/-',
      image: '/assets/images/chair5.png',
    }
  ];

  return (
    <div className="container dealsWrapper">
      <div className="sectionHeader">
        <h6 className="sectionTitle Poppins-regular">
          <span className="accent">Deals</span> of The Week
        </h6>
        <h6 className="sectionSubtitle Poppins-regular">Handpicked deals crafted for your comfort and everyday living.</h6>
      </div>

      <div className="dealsGrid">
        {deals.map((deal) => (
          <div key={deal.id} className="dealCard">
            <div className="imageWrapper">
              <img src={deal.image} alt={deal.name} className="dealImg" />
              {deal.timer && (
                <CountdownStyle1 timer={deal.timer} label="Limited Time only!" />
              )}
            </div>
            <div className="dealDetails">
              <div className="topInfo">
                <span className="brandName Poppins-regular">{deal.brand}</span>
                <span className="rating">★ {deal.rating}</span>
              </div>
              <strong className="productName Poppins-bold">{deal.name}</strong>
              <div className="priceWrapper">
                <span className="oldPrice Poppins-semi-bold">{deal.oldPrice}</span>
                <span className="newPrice Poppins-semi-bold">{deal.newPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsOfTheWeek;
