'use client';

import { ASSETS } from '@/config';
import { sendGTMEvent } from '@next/third-parties/google';
import Image from 'next/image';
import Link from 'next/link';

const NewlyLaunchedCard = ({ item }) => {
  const sendViewCategoryEvent = () => {
    sendGTMEvent({
      event: 'ViewCategory',
      content_category: item?.href,
    });
  };

  return (
    <Link
      href={item.href}
      onClick={() => sendViewCategoryEvent()}
      className="min-w-[300px] min-h-[180px] lg:w-[400px] lg:h-[200px] rounded-xl relative"
      style={{
        backgroundImage: `url(${item.homePageCardImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute -top-4 -left-4">
        <Image
          src={`${ASSETS.ICONS}/newly-launched.png`}
          width={100}
          height={100}
          alt={item.name}
          className="h-12 w-12"
        />
      </div>
      <div
        className="min-w-[300px] min-h-[180px] lg:w-[400px] lg:h-[200px] flex items-end justify-center rounded-xl pb-4"
        style={{
          background:
            'linear-gradient(180deg, rgba(113, 61, 34, 0.00) 6%, #713D22 76.04%)',
        }}
      >
        <div className=" font-fraunces text-white text-lg ">{item.name}</div>
      </div>
    </Link>
  );
};

export default NewlyLaunchedCard;
