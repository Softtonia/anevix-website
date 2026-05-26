'use client';
import React from 'react';
import './HeroBanner.css';
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';

const HeroBanner = () => {
  const slides = [
    {
      sale: 'Sale upto 40% off',
      title: 'ELECTRONICS YOUR BOOK',
      image: '/hero_electronics.png',
      bgColor: '#f7f7f7'
    },
    {
      sale: 'New Arrivals 2026',
      title: 'STYLE FOR EVERYONE',
      image: '/hero.png',
      bgColor: '#e8d5c4'
    }
  ];

  return (
    <div className="heroCarouselWrapper">
      <Carousel interval={3000} indicators={true} controls={false} fade>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <section className="hero" style={{ backgroundColor: slide.bgColor }}>
              <div className="content">
                              <h1 className="title">{slide.title}</h1>

                <span className="saleTag Poppins-semi-bold">{slide.sale}</span>
                <div className="divider"></div>
                <button className="button">Shop Now</button>
              </div>
              
              <div className="imageContainer">
                <Image 
                  src={slide.image} 
                  alt={slide.title} 
                  fill 
                  className="image"
                  priority
                />
              </div>
            </section>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
