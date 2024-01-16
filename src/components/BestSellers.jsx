'use client';
import BestsellerCard from '@/components/BestsellerCard';
import { BestSellerCardSkeleton } from '@/components/Skeletons';
import COLLECTIONS from '@/config/Collections';
import CollectionService from '@/services/collection';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BestSellers = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [
    selectedCollectionForBestsellers,
    setSelectedCollectionForBestsellers,
  ] = useState(COLLECTIONS[0]?.handle);

  const getBestsellers = async () => {
    setBestSellingProducts([]);
    const fetchedProducts = await CollectionService.getProductsInCollection({
      handle: selectedCollectionForBestsellers,
    });
    const bestSellingProductsData =
      fetchedProducts?.data?.data?.collection?.products?.edges?.slice(0, 3);
    setBestSellingProducts(bestSellingProductsData);
  };

  useEffect(() => {
    getBestsellers();
  }, [selectedCollectionForBestsellers]);
  return (
    <>
      <div className="flex px-4 lg:px-0 w-full justify-start lg:justify-center items-center gap-3 mb-3 overflow-x-scroll py-3">
        {COLLECTIONS.map((collection, idx) => (
          <div
            className="flex min-w-fit justify-center items-center px-3 cursor-pointer py-2 rounded-3xl font-questrial text-center text-xs text-primary font-bold"
            style={{
              border: '1px solid #14222B',
              background:
                selectedCollectionForBestsellers === collection.handle
                  ? '#14222B'
                  : 'transparent',
              color:
                selectedCollectionForBestsellers === collection.handle
                  ? 'white'
                  : '#14222B',
            }}
            key={collection.href}
            onClick={() =>
              setSelectedCollectionForBestsellers(collection.handle)
            }
          >
            {collection.name}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="flex px-4 lg:px-0 justify-start lg:justify-center w-full items-start overflow-x-scroll gap-5"
      >
        {bestSellingProducts.length > 0 ? (
          bestSellingProducts?.map((prod, i) => (
            <BestsellerCard product={prod.node} key={prod.node.id} />
          ))
        ) : (
          <>
            <BestSellerCardSkeleton />
            <BestSellerCardSkeleton />
            <BestSellerCardSkeleton />
          </>
        )}
      </motion.div>
    </>
  );
};

export default BestSellers;
