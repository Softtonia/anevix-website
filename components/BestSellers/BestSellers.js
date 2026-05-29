import React from 'react';
import Link from 'next/link';
import './BestSellers.css';
import CountdownStyle2 from '@/utils/CountdownStyle2/CountdownStyle2';

const BestSellers = () => {
  const deals = [
    {
      id: 1,
      brand: 'Acne Facial Cream',
      name: 'BREYLEE ACNE TREATMENT',
      rating: 5.0,
      oldPrice: 'Rs 7000/-',
      newPrice: 'Rs 5490/-',
      image: '/assets/images/chair1.png',
      badge: '50% OFF',
      badgeType: 'discount'
    },
    {
      id: 2,
      brand: 'Acne Facial Cream',
      name: 'BREYLEE ACNE TREATMENT',
      rating: 5.0,
      oldPrice: 'Rs 7000/-',
      newPrice: 'Rs 5490/-',
      image: '/assets/images/chair2.png',
      badge: 'HOT',
      badgeType: 'hot'
    },
    {
      id: 3,
      brand: 'Acne Facial Cream',
      name: 'BREYLEE ACNE TREATMENT',
      rating: 5.0,
      oldPrice: 'Rs 7000/-',
      newPrice: 'Rs 5490/-',
      image: '/assets/images/chair3.png',
      badge: 'HOT',
      badgeType: 'hot'
    },
    {
      id: 4,
      brand: 'Acne Facial Cream',
      name: 'BREYLEE ACNE TREATMENT',
      rating: 5.0,
      oldPrice: 'Rs 7000/-',
      newPrice: 'Rs 5490/-',
      image: '/assets/images/chair4.png',
      badge: '20-30%',
      badgeType: 'discount'
    }
  ];

  const timer = { days: '02', hours: '15', mins: '20', secs: '22' };

  return (
    <div className="container bestSellersWrapper">
      <div className="bs-sectionHeader">
        <h3 className="bs-sectionTitle Poppins-bold">Weekly Best Deals</h3>
        <CountdownStyle2 timer={timer} label="Limited Time only!" />
      </div>

      <div className="bestSellersGrid">
        {deals.map((deal) => (
          <Link key={deal.id} href={`/product/${deal.id}`} className="bestSellerCard">
            <div className="bs-imageWrapper">
              <img src={deal.image} alt={deal.name} className="bestSellerImg" />
              {deal.badge && (
                <div className={`bs-badge ${deal.badgeType}`}>
                  {deal.badge}
                </div>
              )}
            </div>
            
            <div className="bestSellerDetails">
              <div className="bs-brandRating">
                <span className="bs-brandName Poppins-regular">{deal.brand}</span>
                <span className="bs-rating"><span className="bs-star">★</span> {deal.rating}</span>
              </div>
              <strong className="bs-productName Poppins-bold">{deal.name}</strong>
              <div className="bs-priceWrapper">
                <span className="bs-oldPrice Poppins-semi-bold">{deal.oldPrice}</span>
                <span className="bs-newPrice Poppins-semi-bold">{deal.newPrice}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
