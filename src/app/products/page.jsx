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
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import Image from 'next/image';

const page = () => {
  const [product, setProducts] = useState([]);
  const query = useSearchParams();

  console.log(query, 'query');

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await CollectionService.getProductsInCollection({
        handle: 'mi',
      });
      console.log(fetchedProducts);
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  return (
    <MaxWidthWrapper>
      <Head>
        <title>Dorje Teas | Products</title>
        <meta property="og:title" content="Dorje Teas | Products" key="title" />
      </Head>
      <div className="w-full rounded-2xl h-[600px]">
        <Image src={''} />
      </div>
      <div>
        {product.map((prod) => (
          <ProductCard product={prod} key={prod.id} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
