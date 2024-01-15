import BestSellers from '@/components/BestSellers';
import BrandStorySlider from '@/components/BrandStorySlider';
import CollectionsBox from '@/components/CollectionsBox';
import HomePageBannerSlider from '@/components/HomePageBannerSlider';
import HomePageVideo from '@/components/HomePageVideo';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import NewlyLaunchedCard from '@/components/NewlyLaunchedCard';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import { HOME_PAGE_AS_SEEN_ON } from '@/config/HomePage';
import NEWLY_LAUNCHED from '@/config/NewlyLaunched';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={'pt-8 pb-52 w-full grid grid-cols-1 gap-8 lg:gap-16'}>
      {/* COLLECTIONS */}
      <MaxWidthWrapper className={'px-0'}>
        <CollectionsBox />
      </MaxWidthWrapper>

      {/* BANNER */}
      <HomePageBannerSlider />

      {/* NEWLY LAUNCHED */}
      <MaxWidthWrapper
        className={
          'flex items-center justify-start gap-6 overflow-x-scroll py-4 px-6 lg:justify-center lg:gap-12 max-w-screen-xl'
        }
      >
        {NEWLY_LAUNCHED.map((item) => (
          <NewlyLaunchedCard item={item} />
        ))}
      </MaxWidthWrapper>

      {/* AS SEEN ON */}
      <div>
        <div className="text-3xl text-center mb-8 font-fraunces text-secondary font-semibold">
          As seen on
        </div>
        <div className="w-full bg-white py-6">
          <MaxWidthWrapper
            className={
              'flex items-center justify-between lg:justify-center lg:gap-12 max-w-screen-xl'
            }
          >
            {HOME_PAGE_AS_SEEN_ON.map((imgSrc, idx) => (
              <Image
                key={imgSrc}
                src={imgSrc}
                width={100}
                height={100}
                loading="lazy"
                className="h-[30px] lg:h-[60px] lg:!w-[200px] object-contain"
              />
            ))}
          </MaxWidthWrapper>
        </div>
      </div>

      {/* BEST SELLERS */}
      <div
        className="text-3xl py-16 text-center mb-3 font-fraunces text-secondary font-semibold"
        style={{
          width: '100%',
          height: '100%', // Set your desired height
          background: `url(/assets/svg/BestSellerBG.svg) center center no-repeat`,
          backgroundSize: 'cover',
        }}
      >
        <div>Bestsellers</div>
        <div className="w-full py-6">
          <MaxWidthWrapper
            className={
              'flex px-0 flex-col justify-start items-start lg:items-center gap:10 lg:gap-12'
            }
          >
            <BestSellers />
          </MaxWidthWrapper>
        </div>
      </div>

      {/* BRAND STORY */}
      <MaxWidthWrapper className={'mb-32 max-w-screen-xl px-0'}>
        <div className="text-3xl text-center mb-8 font-fraunces text-secondary font-semibold">
          At the heart of Darjeeling
        </div>
        <div className="text-base text-center mb-10 font-questrial max-w-3xl mx-auto">
          Dorje Teas, in Darjeeling's Selim Hills, offers authentic black tea,
          meticulously crafted on our estate. Experience the essence of
          Darjeeling in every sip – where passion meets perfection.
        </div>
        <BrandStorySlider />
      </MaxWidthWrapper>

      {/* TESTIMONIALS */}
      <div
        className="py-16"
        style={{
          width: '100%',
          height: '100%', // Set your desired height
          background: `url(/assets/svg/BestSellerBG.svg) center center no-repeat`,
          backgroundSize: 'cover',
        }}
      >
        <div className="text-3xl text-center mb-3 font-fraunces text-secondary font-semibold">
          Brewing Tea for over 1,00,000 lakh customers
        </div>
        <div className="text-base text-center mb-10 font-questrial max-w-3xl mx-auto">
          Here’s what people of the industry say about us
        </div>
        <div className="w-full py-6 ">
          <MaxWidthWrapper
            className={
              'flex flex-col px-0 max-w-screen-xl justify-start items-start lg:items-center gap:10 lg:gap-12'
            }
          >
            <TestimonialsSlider />
          </MaxWidthWrapper>
        </div>
      </div>

      {/* VIDEO */}
      <MaxWidthWrapper className={'max-w-screen-xl'}>
        <div className="text-3xl text-center mb-8 lg:mb-14 font-fraunces text-secondary font-semibold">
          Behind the scenes
        </div>
        <div className="w-full rounded-2xl h-[216px] lg:h-[600px] bg-white overflow-hidden">
          <HomePageVideo />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
