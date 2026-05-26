import React from 'react';
import './Home.css';
import HeroBanner from '../HeroBanner/HeroBanner';
import PromoBanners from '../PromoBanners/PromoBanners';
import DealsOfTheWeek from '../DealsOfTheWeek/DealsOfTheWeek';
import BestSellers from '../BestSellers/BestSellers';
import Partners from '../Partners/Partners';
import Newsletter from '../Newsletter/Newsletter';

const Home = () => {
  return (
    <div className="homeWrapper">
      {/* Hero Section */}
      <section className="heroSection">
        <HeroBanner />
      </section>

      {/* Promo Banners Section */}
      <section className="promoSection">
        <PromoBanners />
      </section>

      {/* Deals of The Week Section */}
      <section className="dealsSection">
        <DealsOfTheWeek />
      </section>

      {/* Weekly Best Deals Section */}
      <section className="bestSellersSection">
        <BestSellers />
      </section>

      {/* Partners Section */}
      <section className="partnersSection">
        <Partners />
      </section>

      {/* Newsletter Section */}
      <section className="newsletterSection">
        <Newsletter />
      </section>
    </div>
  );
};

export default Home;
