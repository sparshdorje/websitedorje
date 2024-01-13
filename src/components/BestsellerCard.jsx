'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AddToCartButton from './AddToCartButton';
import { cn, extractProductId, formatPrice, truncate } from '@/lib/utils';
import StarRating from './StarRating';
import RatingService from '@/services/rating';

const BestsellerCard = ({ product, className, truncateLimit = 120 }) => {
  const [ratingData, setRatingData] = useState({});
  const productId = extractProductId(product.id);
  const imageUrl = product?.images?.edges?.[0]?.node?.url;

  const fetchRatingData = async (productId) => {
    try {
      const response = await RatingService.getAverageRating(productId);
      setRatingData(response);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchRatingData(productId);
  }, []);

  return (
    <Link
      href={`/products/${product.handle}`}
      className={cn(
        `flex flex-col animate-in items-start overflow-hidden pb-2 rounded-2xl min-w-[300px] w-[300px] h-[440px] bg-white`,
        className
      )}
    >
      <div className="h-[180px] w-full mb-3">
        <Image
          alt="product image"
          src={imageUrl}
          loading="lazy"
          className="w-full h-[180px] object-cover"
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col w-full items-start justify-between h-full">
        <div className="px-4 flex gap-3 justify-between items-start w-full">
          <div>
            <div className="text-left font-fraunces font-semibold text-base text-secondary">
              {product.title}
            </div>
            <StarRating
              rating={ratingData.averageRating}
              totalRatings={ratingData.totalRatings}
              showTotalRating={false}
              variant={'default'}
              size="20"
              className={' opacity-60 text-xs'}
            />
          </div>

          <div className="font-questrial text-sm font-bold text-secondary">
            {formatPrice(product?.variants?.edges?.[0]?.node?.price?.amount)}
          </div>
        </div>

        <div className="px-4 font-questrial text-sm">
          {truncate(product.description, truncateLimit)}
        </div>

        <div className="px-4 w-full">
          <AddToCartButton
            product={product?.variants?.edges?.[0]?.node}
            quantity={1}
            extraClasses={
              'py-2 w-full text-white rounded-3xl text-sm lg:text-sm !important'
            }
            variant="default"
          />
        </div>
      </div>
    </Link>
  );
};

export default BestsellerCard;
