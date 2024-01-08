'use client';
import BrandStorySlider from '@/components/BrandStorySlider';
import BestsellerCard from '@/components/BestsellerCard';
import HomePageBannerSlider from '@/components/HomePageBannerSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { COLLECTIONS, HOME_PAGE_AS_SEEN_ON } from '@/config';
import CollectionService from '@/services/collection';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import TestimonialsSlider from '@/components/TestimonialsSlider';

export default function Home() {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [
    selectedCollectionForBestsellers,
    setSelectedCollectionForBestsellers,
  ] = useState(COLLECTIONS[1]?.handle);
  const getBestsellers = async () => {
    const fetchedProducts = await CollectionService.getProductsInCollection({
      handle: selectedCollectionForBestsellers,
    });
    const bestSellingProductsData =
      fetchedProducts?.data?.data?.collection?.products?.edges?.slice(0, 3);
    setBestSellingProducts(bestSellingProductsData);
  };

  useEffect(() => {
    getBestsellers();
  }, [selectedCollectionForBestsellers]);

  return (
    <div className={'pt-8 pb-52 w-full grid grid-cols-1 gap-16'}>
      {/* COLLECTIONS */}
      <MaxWidthWrapper>
        <div className="flex items-start overflow-x-scroll justify-start lg:justify-center gap-8 pb-2">
          {COLLECTIONS.map((collection, idx) => (
            <Link
              href={collection.href}
              key={collection.handle}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative aspect-square h-20 w-20 lg:h-28 lg:w-28 overflow-hidden rounded-full group-hover:opacity-75">
                <Image
                  src={collection.imageSrc}
                  alt="product category image"
                  fill
                  className="object-contain object-center"
                />
              </div>
              <div className="font-questrial text-center text-xs lg:text-base text-primary font-bold">
                {collection.name}
              </div>
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>

      {/* BANNER */}
      <HomePageBannerSlider />

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
              'flex flex-col justify-start items-start lg:items-center gap:10 lg:gap-12'
            }
          >
            <div className="flex w-full justify-start lg:justify-center items-center gap-3 mb-3 overflow-x-scroll py-3">
              {COLLECTIONS.map((collection, idx) => (
                <div
                  className="flex min-w-fit justify-center items-center px-3 cursor-pointer py-2 rounded-3xl font-questrial text-center text-xs text-primary font-bold"
                  style={{
                    border: '1px solid #14222B',
                    background:
                      selectedCollectionForBestsellers === collection.handle
                        ? '#14222B'
                        : 'transparent',
                    color:
                      selectedCollectionForBestsellers === collection.handle
                        ? 'white'
                        : '#14222B',
                  }}
                  key={collection.handle}
                  onClick={() =>
                    setSelectedCollectionForBestsellers(collection.handle)
                  }
                >
                  {collection.name}
                </div>
              ))}
            </div>
            <div className="flex justify-start lg:justify-center w-full items-start overflow-x-scroll gap-5">
              {bestSellingProducts?.map((prod, i) => (
                <BestsellerCard product={prod.node} key={i} />
              ))}
            </div>
          </MaxWidthWrapper>
        </div>
      </div>

      {/* BRAND STORY */}
      <MaxWidthWrapper className={'mb-32 max-w-screen-xl'}>
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
        <div className="w-full py-6">
          <MaxWidthWrapper
            className={
              'flex flex-col justify-start items-start lg:items-center gap:10 lg:gap-12'
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
          <ReactPlayer
            url={'/assets/brand-story/1.mp4'}
            height="100%"
            width="100%"
            className="rounded-xl overflow-hidden h-full object-fill"
            loop
            controls
            playing
            playIcon={
              <Image
                height={40}
                width={40}
                alt="play icon"
                className="z-10"
                src={'/assets/icons/play-icon.png'}
              />
            }
            fallback={
              <Image
                alt="thumbnnail"
                width={'100'}
                height={'100'}
                className="z-10 h-full w-full"
                src={'/assets/brand-story/thumbnails/1.png'}
              />
            }
            light={'/assets/brand-story/thumbnails/1.png'}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
