'use client';
import React, { useState } from 'react';
import './Partners.css';

const PartnerLogo = ({ brand }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !brand.logo || brand.logo.includes('logo-placeholder.png')) {
    return <span className="logoName">{brand.name}</span>;
  }

  return (
    <img 
      src={brand.logo} 
      alt={brand.name} 
      onError={() => setImgError(true)} 
    />
  );
};

const Partners = () => {
  const brands = [
    { name: 'LV', logo: '/assets/images/lv.png' },
    { name: 'Balmain', logo: '/assets/images/balmain.png' },
    { name: 'H&M', logo: '/assets/images/hm.png' },
    { name: 'Zara', logo: '/assets/images/zara.png' },
    { name: 'L\'Oreal', logo: '/assets/images/loreal.png' },
    { name: 'Adidas', logo: '/assets/images/adidas.png' },
    { name: 'Chanel', logo: '/assets/images/chanel.png' },
    { name: 'Puma', logo: '/assets/images/puma.png' },
    { name: 'Jordan', logo: '/assets/images/jordan.png' },
    { name: 'Tommy Hilfiger', logo: '/assets/images/tommy.png' },
    { name: 'Huawei', logo: '/assets/images/huawel.png' },
    { name: 'Gucci', logo: '/assets/images/gucci.png' },
    { name: 'Apple', logo: '/assets/images/apple.png' },
    { name: 'MK', logo: '/assets/images/mk.png' },
    { name: 'Prada', logo: '/assets/images/prada.png' },
    { name: 'Versace', logo: '/assets/images/versace.png' },
    { name: 'CH', logo: '/assets/images/ch.png' },
    { name: 'Levi\'s', logo: '/assets/images/levi.png' },
  ];

  return (
    <div className="container-fluid partnersWrapper">
      <div className="partnersContent">
        <div className="partnersText">
          <h3 className="Poppins-semi-bold">Trusted by our Customers & Partners</h3>
        </div>
        <div className="partnersGrid">
          <div className="partnersTrack">
            {brands.map((brand, index) => (
              <div key={index} className="partnerLogoBox">
                <PartnerLogo brand={brand} />
              </div>
            ))}
            {/* Duplicate for infinite loop */}
            {brands.map((brand, index) => (
              <div key={`dup-${index}`} className="partnerLogoBox duplicateLogo">
                <PartnerLogo brand={brand} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
