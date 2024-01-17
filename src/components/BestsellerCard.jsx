'use client';

import { cn, extractProductId, formatPrice, truncate } from '@/lib/utils';
import RatingService from '@/services/rating';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddToCartButton from './AddToCartButton';
import StarRating from './StarRating';

const BestsellerCard = ({
  product,
  className,
  truncateLimit = 120,
  variantTruncateLimit = 30,
  showTotalRating = true,
}) => {
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
    <div
      className={cn(
        `flex flex-col animate-in items-start overflow-hidden pb-2 rounded-2xl min-w-[300px] w-[300px] h-[460px] bg-white`,
        className
      )}
    >
      <Link className="w-full" href={`/products/${product.handle}`}>
        <div className="h-[200px] w-full mb-3">
          <Image
            alt="product image"
            src={imageUrl}
            loading="lazy"
            className="w-full h-[200px] object-cover"
            width={400}
            height={400}
          />
        </div>
      </Link>

      <div className="flex flex-col w-full items-start justify-between h-full gap-4">
        <Link
          className="flex px-4 flex-col w-full items-start justify-between h-full"
          href={`/products/${product.handle}`}
        >
          <div className=" flex gap-3 justify-between items-start w-full">
            <div>
              <div className="text-left font-fraunces font-semibold text-base text-secondary">
                {product.title}
              </div>
              <StarRating
                rating={ratingData.averageRating}
                totalRatings={ratingData.totalRatings}
                showTotalRating={showTotalRating}
                variant={'default'}
                size="20"
                className={' opacity-60 text-xs'}
              />
            </div>
          </div>

          <div className="font-questrial text-sm text-left">
            {truncate(product.description, truncateLimit)}
          </div>

          <div className="font-questrial text-left text-sm font-bold text-secondary flex items-center gap-2">
            {formatPrice(product?.variants?.edges?.[0]?.node?.price?.amount)}
            <span className="text-gray-600 text-xs font-medium">
              (
              {truncate(
                product?.variants?.edges?.[0]?.node?.title,
                variantTruncateLimit
              )}
              )
            </span>
          </div>
        </Link>

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
    </div>
  );
};

export default BestsellerCard;
