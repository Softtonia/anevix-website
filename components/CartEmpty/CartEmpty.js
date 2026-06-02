import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './CartEmpty.css';
import StayUpdated from '../StayUpdated/StayUpdated';

export default function CartEmpty() {
  return (
    <>
    <div className="emptyCartPage">
      <div className="emptyCard">
        <div className="emptyImage">
          <Image src="/assets/images/empty-cart.png" alt="Empty Cart" width={220} height={220} priority />
        </div>
        <h4 className="emptyTitle Poppins-medium">Your Cart is Empty!</h4>
        <p className="emptySubtitle Poppins-regular">Looks like you haven&apos;t added anything to your cart yet</p>
        <Link href="/shop" className="emptyContinue Poppins-regular">
          <span className="emptyContinueText">Continue Shopping</span>
          <span className="emptyContinueIcon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </Link>
      </div>
    </div>
    <StayUpdated/>
    </>
  );
}
