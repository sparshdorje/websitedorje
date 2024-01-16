'use client';
import { useEffect, useState } from 'react';
import ProductService from '../services/product';
import RelatedProductCard from './RelatedProductCard';

const RelatedProduct = ({
  productId,
  className = 'mx-auto flex items-start justify-start overflow-x-scroll lg:justify-center gap-6 px-2.5 lg:px-0',
  ratingCardVariant = 'default',
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
    <div className={className}>
      {relatedProducts?.map((product) => (
        <RelatedProductCard
          variant={ratingCardVariant}
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default RelatedProduct;
