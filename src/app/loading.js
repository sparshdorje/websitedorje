import { ASSETS } from '@/config';
import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col justify-start pt-56 items-center min-h-screen w-full">
      <Image
        src={`${ASSETS.ICONS}/dorje-logo.png`}
        alt="Loader"
        loading="eager"
        width={100}
        height={100}
        className=" animate-pulse h-28 w-28 mb-6"
      />
      <div className="font-fraunces animate-pulse text-primary font-semibold">
        Brewing...
      </div>
    </div>
  );
};

export default Loading;
