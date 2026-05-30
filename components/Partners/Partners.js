import React from 'react';
import './Partners.css';

const Partners = () => {
  const brands = [
    { name: 'LV', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Balmain', logo: '/assets/images/logo-placeholder.png' },
    { name: 'H&M', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Zara', logo: '/assets/images/logo-placeholder.png' },
    { name: 'L\'Oreal', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Adidas', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Chanel', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Puma', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Jordan', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Tommy Hilfiger', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Huawei', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Gucci', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Apple', logo: '/assets/images/logo-placeholder.png' },
    { name: 'MK', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Prada', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Versace', logo: '/assets/images/logo-placeholder.png' },
    { name: 'CH', logo: '/assets/images/logo-placeholder.png' },
    { name: 'Levi\'s', logo: '/assets/images/logo-placeholder.png' },
  ];

  return (
    <div className="container-fluid partnersWrapper">
      <div className="partnersContent">
        <div className="partnersText">
          <h3 className="Poppins-semi-bold">Trusted by our Customers & Partners</h3>
        </div>
        <div className="partnersGrid">
          {brands.map((brand, index) => (
            <div key={index} className="partnerLogoBox">
              <span className="logoName">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
