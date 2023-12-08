'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import React, { useState, useEffect } from 'react';
import {
  addToCart,
  axiosInstance,
  checkout,
  fetchProducts,
} from '@/ShopifyService';

const page = () => {
  const [product, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      console.log(fetchedProducts);
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  // useEffect(() => {
  //   async function createCustomer() {
  //     try {
  //       const response = await axiosInstance.post('/', {
  //         query: `
  //           mutation {
  //             customerCreate(input: {
  //               email: "abhishekcoolyadav6.ay@gmail.com",
  //               password: "abhishek6700",
  //               firstName: "Abhishek",
  //               lastName: "Yadav"
  //             }) {
  //               customer {
  //                 id
  //                 email
  //                 firstName
  //                 lastName
  //                 phone
  //               }
  //               customerUserErrors {
  //                 code
  //                 field
  //                 message
  //               }
  //             }
  //           }
  //         `,
  //       });

  //       console.log(
  //         'Created Customer:',
  //         response.data.data.customerCreate.customer
  //       );
  //     } catch (error) {
  //       console.error('Error creating customer:', error);
  //     }
  //   }

  //   createCustomer();
  // }, []);

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
          <li key={prod.id}>
            <h2>{prod.title}</h2>
            <p>{prod.description}</p>
            <p>{prod.id}</p>
            <p>{prod.variants?.[0]?.price?.amount}</p>

            <button onClick={() => handleAddToCart(prod.variants?.[0]?.id)}>
              add to cart
            </button>
            {/* Display other product information */}
          </li>
        ))}
      </ul>
    </MaxWidthWrapper>
  );
};

export default page;
