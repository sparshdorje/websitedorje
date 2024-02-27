import BrandStorySlider from '@/components/BrandStorySlider';
import BirdsOfSelimHillSlider from '@/components/BirdsOfSelimHillSlider';
import RestaurantsOfSelimHillSlider from '@/components/RestaurantsOfSelimHillSlider';
import KnowYourTeaSlider from '@/components/KnowYourTeaSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import SpotifyPlaylistSlider from '@/components/SpotifyPlaylistSlider';
import { ASSETS } from '@/config';
import Image from 'next/image';
import React from 'react';

export async function generateMetadata() {
  return {
    title: 'Experience Darjeeling',
    description:
      'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
    openGraph: {
      title: 'Experience Darjeeling',
      description:
        'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
      url: `https://dorjeteas.com/pages/experience`,
      siteName: 'Dorje Teas',
      images: [
        {
          url: `${ASSETS.ICONS}/dorje-logo.png`, // Must be an absolute URL
        },
      ],
    },
  };
}

const page = () => {
  return (
    <div className={'pt-0 pb-24 w-full grid grid-cols-1 gap-10 lg:gap-16'}>
      <div className="relative w-full lg:h-[700px] h-[250px]">
        <Image
          width={900}
          height={900}
          className="h-full w-full object-cover object-bottom"
          src={`${ASSETS.EXPERIENCE}/experience-darjeeling-banner.webp`}
        />
        <div
          style={{
            background:
              'linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 80%)',
          }}
          className="absolute h-full w-full flex flex-wrap items-center top-0 right-0 shadow-sm shadow-white justify-center font-fraunces text-3xl lg:text-7xl text-white"
        >
          <div> Experience Darjeeling</div>
        </div>
      </div>

      {/* <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
        <div className="text-3xl  mb-8 font-fraunces text-secondary font-semibold">
          Himalayan home stays
        </div>
        <div className="w-full  "></div>
      </MaxWidthWrapper> */}
      <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
        <div className="text-3xl px-3 lg:px-10 mb-8 font-fraunces text-secondary font-semibold">
          Top restaurants
        </div>
        <div className="w-full  ">
          <RestaurantsOfSelimHillSlider />
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
        <div className="text-3xl px-3 lg:px-10 mb-8 font-fraunces text-secondary font-semibold">
          Moonlight plucking
        </div>
        <div className="w-full">
          <KnowYourTeaSlider
            productHandle={'moonlight-sonata-limited-edition'}
          />
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
        <div className="text-3xl px-3 lg:px-10 mb-8 font-fraunces text-secondary font-semibold">
          Birds of Selim Hill
        </div>
        <div className="w-full  ">
          <BirdsOfSelimHillSlider />
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
        <div className="text-3xl px-3 lg:px-10 mb-8 font-fraunces text-secondary font-semibold">
          Factory of Selim Hill
        </div>
        <div className="w-full  px-0">
          <BrandStorySlider />
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
        <div className="text-3xl px-3 lg:px-10 mb-8 font-fraunces text-secondary font-semibold">
          Spotify playlist
        </div>
        <div className="w-full  lg:px-10">
          <div className="w-full h-[90px] lg:h-[300px]">
            <SpotifyPlaylistSlider />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
