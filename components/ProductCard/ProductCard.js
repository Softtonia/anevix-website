'use client';

import React from 'react';
import Link from 'next/link';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="productCard">

      {/* IMAGE */}
      <div className="productCardImageWrapper">
        <img
          src={product.image}
          alt={product.name}
          className="productCardImage"
        />

        {product.badge && (
          <span className={`productCardBadge ${product.badgeType}`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* INFO */}
      <div className="productCardInfo">

        {/* BRAND + RATING */}
        <div className="productCardTop">
          <span className="productCardBrand">
            {product.brand}
          </span>

          <span className="productCardRating">
            ★ {product.rating}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="productCardTitle">
          {product.name}
        </h3>

        {/* PRICE */}
        <div className="productCardPricing">
          <span className="productCardOldPrice">
            {product.oldPrice}
          </span>

          <span className="productCardNewPrice">
            {product.newPrice}
          </span>
        </div>

        {/* BOTTOM */}
        <div className="productCardMeta">
          <span className="productCardReviews">
            {product.reviewCount} reviews
          </span>

          {product.discountTag && (
            <span className="productCardDiscount">
              {product.discountTag}
            </span>
          )}
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;