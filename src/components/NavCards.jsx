import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NavCards = ({ item, variant = 'collection-card' }) => {
  switch (variant) {
    case 'collection-card': {
      return (
        <Link
          href={item.href}
          className="w-48 h-56 bg-white flex flex-col items-center rounded-xl justify-center"
        >
          <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-lg group-hover:opacity-75">
            <Image
              src={item.imageSrc}
              alt="product category image"
              fill
              className="object-contain object-center"
            />
          </div>

          <div className="mt-6 block font-fraunces text-base font-bold text-brand">
            {item.name}
          </div>
        </Link>
      );
    }
    case 'rectangle-card': {
      return (
        <Link
          href={item.href}
          className=" w-96 h-36 px-2 bg-white flex items-center rounded-xl gap-4"
        >
          {item.newLaunch && (
            <div className="absolute top-0 right-0 py-2 px-4 bg-brand rounded-tr-xl rounded-bl-xl text-white">
              New
            </div>
          )}

          <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-lg group-hover:opacity-75">
            <Image
              src={item.imageSrc}
              alt="product category image"
              fill
              className="object-contain object-center"
            />
          </div>

          <div className="flex-1">
            <div className="block font-fraunces text-base font-bold text-brand mb-1">
              {item.name}
            </div>
            <div className="block font-fraunces text-xs font-regular text-brand">
              {item.description}
            </div>
          </div>
        </Link>
      );
      break;
    }
  }
};

export default NavCards;
