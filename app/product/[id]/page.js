import React from 'react';
import ProductDetail from '@/components/ProductDetail/ProductDetail';

export default function ProductPage({ params }) {
  return <ProductDetail productId={params.id} />;
}
