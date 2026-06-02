"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/utils/Button/Button';
import './Cart.css';

const initialItems = [
  {
    id: 1,
    title: 'Gradient Sunglasses',
    price: 4490,
    qty: 1,
    image: '/assets/images/product1.png',
    rating: 5,
    reviews: 2590,
  },
  {
    id: 2,
    title: 'Casual Baby Dress',
    price: 5490,
    qty: 1,
    image: '/assets/images/product2.png',
    rating: 5,
    reviews: 2590,
  },
  {
    id: 3,
    title: 'Black Hoodie',
    price: 3490,
    qty: 1,
    image: '/assets/images/product3.png',
    rating: 5,
    reviews: 2590,
  },
];

export default function Cart() {
  const [items, setItems] = useState(initialItems);

  const updateQty = (id, delta) => {
    setItems((prev) => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = Math.round(subtotal * 0.2);
  const delivery = 90;
  const total = subtotal - discount + delivery;

  return (
    <div className="cartPage">
              <h1>My Cart</h1>

      <div className="cartWrapper">
        <div className="cartItems">
          <div className="cartList">
            {items.map(item => (
              <div className="cartItem" key={item.id}>
                <div className="cartCard">
                  <div className="leftCol">
                    <img src={item.image} alt={item.title} className="cartThumb" />
                    <div className="cartDetails">
                      <h4 className="Poppins-regular">{item.title}</h4>
                      <div className="ratingRow">
                        <span className="stars">{Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} style={{ color: i < item.rating ? 'var(--dark-orange)' : '#ddd' }}>★</span>
                        ))}</span>
                        <span className="reviews Poppins-regular"> ({item.reviews.toLocaleString()})</span>
                      </div>
                      <p className="smallText Poppins-regular">15% Rs. 7,000 Rs. {item.price.toLocaleString()}  </p>
                      <p className="Poppins-regular bank-offer-text">Rs. 4,450 with Bank offer + more</p>
                      <p className="Poppins-regular delivered-date-status">Express Delivery by Tomorrow</p>
                    </div>
                  </div>

                  <div className="rightCol">
                    <div className="qtyBox">
                      <button className="qtyBtn" onClick={() => updateQty(item.id, -1)}>-</button>
                      <span className="qty">{item.qty}</span>
                      <button className="qtyBtn" onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>

                    <div className="itemActions">
                      <button className="moveBtn Poppins-regular">Move to Wishlist</button>
                      <button className="removeBtn Poppins-regular" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="orderSummary">
          <h4
           className="Poppins-medium">Order Summary</h4>
          <div className="summaryRow "><span className="Poppins-regular">Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
          <div className="summaryRow "><span className="Poppins-regular">Discount (-20%)</span><span>- Rs. {discount.toLocaleString()}</span></div>
          <div className="summaryRow "><span className="Poppins-regular">Delivery Fee</span><span>Rs. {delivery.toLocaleString()}</span></div>
          <div className="summaryTotal"><span>Total</span><span>Rs. {total.toLocaleString()}</span></div>
          <button className="checkoutBtn Poppins-regular" onClick={() => alert('Proceed to checkout')}>
            <span className="checkoutIcon">🧾</span>
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}
