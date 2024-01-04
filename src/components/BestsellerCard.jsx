import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AddToCartButton from './AddToCartButton';
import { formatPrice, truncate } from '@/lib/utils';

const BestsellerCard = ({ product }) => {
  const imageUrl = product?.images?.edges?.[0]?.node?.url;

  return (
    <Link
      href={`/products/${product.handle}`}
      className={`flex flex-col items-start overflow-hidden pb-2 rounded-2xl min-w-[300px] w-[300px] h-[440px] bg-white`}
    >
      <div className="h-[180px] w-full mb-3">
        <Image
          alt="product image"
          src={imageUrl}
          className="w-full h-[180px] object-cover"
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col w-full items-start justify-between h-full">
        <div className="px-4 flex gap-3 justify-between items-start w-full">
          <div className="text-left font-fraunces font-semibold text-base text-secondary">
            {product.title}
          </div>
          <div className="font-questrial text-sm font-bold text-secondary">
            {formatPrice(product?.variants?.edges?.[0]?.node?.price?.amount)}
          </div>
        </div>

        <div className="px-4 font-questrial text-sm">
          {truncate(product.description, 120)}
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
