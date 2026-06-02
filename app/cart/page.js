import React from 'react';
import Cart from '@/components/Cart/Cart';
import StayUpdated from '@/components/StayUpdated/StayUpdated';

export const metadata = {
  title: 'My Cart',
  description: 'Review items in your cart and proceed to checkout.',
  alternates: { canonical: '/cart' }
};

export default function CartPage() {
  return (
    <div>
      <Cart />
      <StayUpdated />
    </div>
  );
}
