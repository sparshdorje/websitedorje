import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import StarRating from './StarRating';

const RelatedProductCard = ({ product }) => {
  const imageUrl = product?.images?.edges?.[0]?.node?.url;
  return (
    <Link
      href={`/products/${product.handle}`}
      className={`flex flex-col gap-1 items-start pb-2 min-w-[200px] w-[200px]`}
    >
      <div className="w-full h-[200px] mb-1 rounded-xl overflow-hidden">
        <Image
          alt="product image"
          loading="eager"
          src={imageUrl}
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
      </div>
      <div className="text-left font-fraunces font-semibold text-base text-white">
        {product.title}
      </div>
      <StarRating
        rating={3.3}
        totalRatings={238}
        showTotalRating={false}
        variant={'white'}
        size="20"
        className={'text-white opacity-60 text-xs'}
      />
    </Link>
  );
};

export default RelatedProductCard;
