'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import React, { useState, useEffect } from 'react';
import {
  addToCart,
  checkout,
  fetchProducts,
  fetchProductsByName,
} from '@/services/ShopifyService';
import Link from 'next/link';
import CollectionService from '@/services/collection';

const page = () => {
  const [product, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProductsByName({
        searchQuery: 'mi',
      });
      console.log(fetchedProducts);
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  useEffect(() => {
    async function createCustomer() {
      try {
        const response = await CollectionService.getCollections();

        console.log('Created Customer:', response.data.data);
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    }

    createCustomer();
  }, []);

  const handleAddToCart = async (productId) => {
    console.log(productId, 'pp');
    const checkoutUrl = await addToCart(productId);

    if (checkoutUrl) {
      console.log(checkoutUrl);
      window.location.href = checkoutUrl;
      // Redirect to the checkout page
    } else {
      console.error('Failed to add the product to the cart.');
    }
  };
  return (
    <MaxWidthWrapper>
      <h1>Products</h1>
      <ul>
        {product.map((prod) => (
          <li key={prod.title}>
            <Link href={`/products/${prod.handle}`}>
              <h2>{prod.title}</h2>
              <p>{prod.description}</p>
              <p>{prod.id}</p>
              <p>{prod.variants?.[0]?.price?.amount}</p>

              <button onClick={() => handleAddToCart(prod.variants?.[0]?.id)}>
                add to cart
              </button>
            </Link>

            {/* Display other product information */}
          </li>
        ))}
      </ul>
    </MaxWidthWrapper>
  );
};

export default page;
