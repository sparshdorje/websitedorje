import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { HOME_PAGE_AVAILABLE_ON } from '@/config/HomePage';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const AvailableOnStrip = () => {
  return (
    <MaxWidthWrapper
      className={cn(
        'flex items-center justify-between lg:justify-center lg:gap-16 max-w-screen-xl',
        {
          'justify-start gap-8 overflow-x-scroll lg:flex-wrap':
            HOME_PAGE_AVAILABLE_ON.length > 3,
        }
      )}
    >
      {HOME_PAGE_AVAILABLE_ON.map((imgSrc, idx) => (
        <Image
          key={imgSrc}
          src={imgSrc}
          width={300}
          height={100}
          alt="logo"
          loading="lazy"
          className="h-[50px] w-[30%] lg:h-[60px] lg:!w-fit object-contain"
        />
      ))}
    </MaxWidthWrapper>
  );
};

export default AvailableOnStrip;
