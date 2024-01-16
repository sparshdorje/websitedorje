'use client';

import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AddToCartButton from './AddToCartButton';
import { usePalette } from 'color-thief-react';
import Image from 'next/image';
import { cn, extractProductId, formatPrice, truncate } from '@/lib/utils';
import RatingService from '@/services/rating';
import StarRating from './StarRating';
import { ASSETS } from '../config';
import { ProductCardSkeleton } from './Skeletons';
import { motion } from 'framer-motion';

const ProductCard = ({ product, bestSeller = false }) => {
  const [ratingData, setRatingData] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('#E08C5D'); // Initial background color
  const imageUrl = product?.images?.edges?.[0]?.node?.url;
  const productId = extractProductId(product.id);
  const { data, loading, error } = usePalette(imageUrl, 2, 'rgbArray', {
    crossOrigin: 'Anonymous',
  });

  const containerStyle = {
    backgroundColor: `rgba(${backgroundColor[0]},${backgroundColor[1]},${backgroundColor[2]},0.25)`,
  };

  const fetchRatingData = async (productId) => {
    try {
      const response = await RatingService.getAverageRating(productId);
      setRatingData(response);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useLayoutEffect(() => {
    try {
      if (data && data.length > 0) {
        setBackgroundColor(data[0]);
      }
    } catch (error) {
      console.error('Error extracting color:', error);
    }
  }, [data]);

  useEffect(() => {
    fetchRatingData(productId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {!loading ? (
        <div
          className={`flex flex-col relative items-start shadow-md justify-between p-4 rounded-2xl min-w-[300px] w-[300px] h-[480px] gap-3`}
          style={containerStyle}
        >
          {bestSeller && (
            <Image
              alt="Best seller"
              width={200}
              height={200}
              className="h-9 w-9 object-contain absolute top-6 z-10 right-6 "
              src={`${ASSETS.ICONS}/best-seller.png`}
            />
          )}
          <Link
            className="flex flex-col relative items-start justify-between h-full w-full"
            href={`/products/${product.handle}`}
          >
            <div className="h-[200px] w-full rounded-lg">
              <Image
                loading="lazy"
                alt="product image"
                src={imageUrl}
                className="w-full h-[200px] object-cover rounded-2xl"
                width={500}
                height={500}
              />
            </div>
            <div>
              <div className=" font-fraunces font-semibold text-base mb-2">
                {product.title}
              </div>
              <StarRating
                rating={ratingData.averageRating}
                totalRatings={ratingData.totalRatings}
                showTotalRating={false}
                variant={'default'}
                size="20"
                className={' opacity-80 text-xs'}
              />
            </div>
            <div className=" font-questrial text-xs">
              {truncate(product.description, 160)}
            </div>
            <div className=" font-questrial text-sm font-semibold flex items-center gap-2">
              {formatPrice(product?.variants?.edges?.[0]?.node?.price?.amount)}
              <span className="text-gray-600 text-xs font-medium">
                ({product?.variants?.edges?.[0]?.node?.title})
              </span>
            </div>
          </Link>
          <div className="w-full h-8 mb-1">
            <AddToCartButton
              product={product?.variants?.edges?.[0]?.node}
              quantity={1}
              extraClasses={
                'py-2 w-full text-white text-sm lg:text-sm !important'
              }
              variant="default"
            />
          </div>
        </div>
      ) : (
        <ProductCardSkeleton />
      )}
    </motion.div>
  );
};

export default ProductCard;
