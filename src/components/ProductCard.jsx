'use client';

import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AddToCartButton from './AddToCartButton';
import { usePalette } from 'color-thief-react';
import Image from 'next/image';
import { cn, formatPrice, truncate } from '@/lib/utils';

const ProductCard = ({ product }) => {
  const [backgroundColor, setBackgroundColor] = useState('#E08C5D'); // Initial background color
  const imageUrl = product?.images?.edges?.[0]?.node?.url;
  const { data, loading, error } = usePalette(imageUrl, 2, 'rgbArray', {
    crossOrigin: 'Anonymous',
  });

  const containerStyle = {
    backgroundColor: `rgb(${backgroundColor[0]},${backgroundColor[1]},${backgroundColor[2]},0.4)`,
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

  return (
    <>
      {!loading && (
        <Link
          href={`/products/${product.handle}`}
          className={`flex flex-col items-start justify-between p-4 rounded-2xl min-w-[300px] w-[300px] h-[480px] gap-2`}
          style={containerStyle}
        >
          <div className="h-[200px] w-full rounded-lg">
            <Image
              loading="lazy"
              alt="product image"
              src={imageUrl}
              className="w-full h-[200px] object-cover rounded-2xl"
              width={100}
              height={200}
            />
          </div>
          <div className=" font-fraunces font-semibold text-base">
            {product.title}
          </div>
          <div className=" font-questrial text-xs">
            {truncate(product.description, 160)}
          </div>
          <div className=" font-questrial text-sm font-medium">
            {formatPrice(product?.variants?.edges?.[0]?.node?.price?.amount)}
          </div>
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
        </Link>
      )}
    </>
  );
};

export default ProductCard;
