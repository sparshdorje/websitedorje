'use client';
import React, { useEffect, useState } from 'react';
import RelatedProductCard from './RelatedProductCard';
import ProductService from '../services/product';

const RelatedProduct = ({
  productId,
  classNames = 'mx-auto flex items-start justify-start overflow-x-scroll lg:justify-center gap-6',
}) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  async function fetchRelatedProduct(productId) {
    try {
      const response = await ProductService.getRelatedProduct({
        productId,
      });

      setRelatedProducts(response.data.data.productRecommendations.slice(0, 4));
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  useEffect(() => {
    fetchRelatedProduct(productId);
  }, [productId]);
  return (
    <div className={classNames}>
      {relatedProducts?.map((product) => (
        <RelatedProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProduct;
