'use client';

import COLLECTIONS from '@/config/Collections';
import CollectionService from '@/services/collection';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';

const AllCollections = () => {
  return (
    <div className="w-full flex flex-col items-start gap-16">
      {COLLECTIONS.map((collection) => (
        <div className="w-full" key={collection.handle}>
          <CollectionsProductList
            collectionHandle={collection.handle}
            collectionName={collection.name}
          />
        </div>
      ))}
    </div>
  );
};

const CollectionsProductList = ({ collectionHandle, collectionName }) => {
  const [products, setProducts] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const targetElementRef = useRef();

  const getProducts = async () => {
    try {
      const fetchedProducts = await CollectionService.getProductsInCollection({
        handle: collectionHandle,
      });
      const allProducts =
        fetchedProducts?.data?.data?.collection?.products?.edges;

      setProducts(allProducts);
      setIsFetched(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        getProducts();
        observer.unobserve(entry.target);
      }
    });
  };

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0, // Adjust threshold as needed
    });

    if (targetElementRef.current) {
      observer.observe(targetElementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={targetElementRef}>
      {isFetched && products && products.length > 0 && (
        <div>
          <div className="px-4 lg:px-0 text-center lg:text-left font-fraunces font-semibold text-2xl lg:text-xl mb-4 text-primary">
            {collectionName}
          </div>
          <div className="px-4 lg:px-0 w-full flex flex-wrap items-center justify-center md:grid-cols-3 lg:grid-cols-4 md:grid gap-5 py-2">
            {products?.map((prod) => (
              <ProductCard product={prod.node} key={prod.node.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCollections;
