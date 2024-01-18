'use client';

import SHOP_BY_NEED from '@/config/ShopByNeed';
import { sendGTMEvent } from '@next/third-parties/google';
import Image from 'next/image';
import Link from 'next/link';

const ShopByNeedBoxes = ({ collectionHandle = '' }) => {
  const sendViewCategoryEvent = ({ href }) => {
    sendGTMEvent({
      event: 'ViewCategory',
      content_category: href,
      eventID: parseInt(Math.random() * 10000000000),
    });
  };
  return (
    <div className="flex items-start px-4 lg:items-center overflow-x-scroll justify-start lg:justify-center gap-8">
      {SHOP_BY_NEED.map((collection, idx) => (
        <Link
          href={collection.href}
          key={collection.handle}
          onClick={() => sendViewCategoryEvent({ href: collection.href })}
          className="flex flex-col items-center gap-2 lg:gap-4"
        >
          <div
            className="relative aspect-square h-20 w-20 lg:h-28 lg:w-28 overflow-hidden rounded-full group-hover:opacity-75"
            style={{
              border:
                collectionHandle === collection.handle && '2px solid #40733E',
            }}
          >
            <Image
              loading="eager"
              src={collection.imageSrc}
              alt="product category image"
              fill
              className="object-contain object-center"
            />
          </div>
          <div
            className="font-questrial text-center text-xs lg:text-base text-primary font-bold"
            style={{
              color: collectionHandle === collection.handle && '#40733E',
            }}
          >
            {collection.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ShopByNeedBoxes;
