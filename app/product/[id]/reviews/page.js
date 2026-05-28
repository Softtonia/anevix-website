import React from 'react';
import ProductReview from '@/components/ProductReview/ProductReview';

export default function ProductReviewPage({ params }) {
  return <ProductReview productId={params.id} />;
}
