import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Image from 'next/image';

const Ticker = () => {
  return (
    <div className="bg-primary px-3 lg:px-0 py-3">
      <MaxWidthWrapper
        className={'flex items-center justify-center gap-4 lg:gap-3'}
      >
        <div className="h-10 w-10 lg:h-8 lg:w-8">
          <Image
            src={'/assets/icons/announcement.png'}
            className="h-full w-full object-contain"
            width={100}
            height={100}
            loading="eager"
          />
        </div>
        <div className="text-white font-questrial text-xs lg:text-base">
          Use BFS25 to get 25% off on orders above Rs. 749 | LIMITED TIME OFFER
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Ticker;
