"use client";
import React, { useState, useEffect } from 'react';
import './DealsOfTheWeek.css';

const CountdownTimer = ({ initialTimer }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: parseInt(initialTimer.days, 10),
    hours: parseInt(initialTimer.hours, 10),
    mins: parseInt(initialTimer.mins, 10),
    secs: parseInt(initialTimer.secs, 10)
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, mins, secs } = prevTime;

        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          if (mins > 0) {
            mins--;
          } else {
            mins = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                clearInterval(timerId);
                return prevTime;
              }
            }
          }
        }
        return { days, hours, mins, secs };
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (time) => time.toString().padStart(2, '0');

  return (
    <div className="timerOverlay">
      <div className="timerUnit">
        <span className="time">{formatTime(timeLeft.days)}</span>
        <span className="label">Days</span>
      </div>
      <span className="timerSeparator">:</span>
      <div className="timerUnit">
        <span className="time">{formatTime(timeLeft.hours)}</span>
        <span className="label">Hours</span>
      </div>
      <span className="timerSeparator">:</span>
      <div className="timerUnit">
        <span className="time">{formatTime(timeLeft.mins)}</span>
        <span className="label">Min</span>
      </div>
      <span className="timerSeparator">:</span>
      <div className="timerUnit">
        <span className="time">{formatTime(timeLeft.secs)}</span>
        <span className="label">Sec</span>
      </div>
    </div>
  );
};

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
    <div className="container-fluid dealsWrapper">
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
              {deal.timer && <CountdownTimer initialTimer={deal.timer} />}
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
