import BestsellerCard from '@/components/BestsellerCard';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import ProductService from '@/services/product';
import Image from 'next/image';

import React from 'react';

const fetchProducts = async () => {
  try {
    const response = await ProductService.getAllProducts();

    return response?.data?.data?.products?.edges
      ?.map((product) => {
        return product;
      })
      .slice(0, 5);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

const page = async () => {
  const products = await fetchProducts();

  return (
    <div className={'pb-0 lg:pb-52 w-full grid grid-cols-1 lg:gap-16'}>
      {/* HERO SECTION */}
      <div className="bg-[#679FA1] bg-opacity-50 w-full h-[700px]">
        <div
          className={
            'flex flex-col-reverse lg:flex-row items-center h-full gap-8'
          }
        >
          <div className="flex flex-col items-start gap-8 px-4 pb-8 lg:px-20">
            <div className="font-fraunces text-4xl lg:text-6xl text-primary">
              Welcome to <br /> Darjeeling
            </div>
            <div className="font-questrial text-lg lg:text-xl text-primary">
              This is a subtitle for this particular section that explains more
              about Darjeeling and Dorje.
            </div>
            <Button className={'rounded-full'}>Read More</Button>
          </div>

          <div className="flex flex-col items-start gap-8 w-full lg:w-[60%] h-full">
            <Image
              loading="eager"
              height={700}
              width={700}
              src={'/assets/about-us/hero-bg.webp'}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="w-full h-[700px] mb-12 lg:mb-0">
        <MaxWidthWrapper
          className={
            'flex flex-col lg:flex-row items-center justify-between h-full gap-16 px-0'
          }
        >
          <div className="flex flex-col lg:rounded-xl lg:overflow-hidden items-start gap-8 w-full h-full lg:w-[50%] lg:h-[80%]">
            <Image
              loading="lazy"
              height={700}
              width={700}
              src={'/assets/about-us/about-bg.webp'}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-8 w-full px-3 lg:px-0 lg:w-[40%]">
            <div className="font-fraunces text-4xl lg:text-6xl text-primary">
              About
            </div>
            <div className="font-questrial text-lg lg:text-xl text-primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
            <Button className={'rounded-full'}>Read More</Button>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* OUR PRODUCTS */}
      <div className="bg-[#EFE1D4] w-screen h-[700px] mb-12 lg:mb-0">
        <MaxWidthWrapper
          className={
            'flex items-center justify-start lg:justify-center w-full h-full gap-8'
          }
        >
          <div className="lg:flex lg:flex-col lg:items-start lg:w-fit w-full">
            <div className="font-fraunces text-4xl lg:text-6xl mb-6 text-primary">
              Our Products
            </div>
            <div className="flex justify-start lg:justify-center w-full items-start overflow-x-scroll gap-8">
              {products?.map((prod, i) => (
                <BestsellerCard
                  product={prod.node}
                  key={i}
                  className={'min-w-[250px] w-[250px] h-[380px]'}
                  truncateLimit={60}
                />
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* VISIT US */}
      <div className="w-full h-[700px] mb-12 lg:mb-0">
        <MaxWidthWrapper
          className={
            'flex flex-col lg:flex-row  items-center justify-between h-full gap-16 px-0'
          }
        >
          <div className="flex flex-col items-start gap-8 w-full lg:w-[40%] px-3 lg:px-0">
            <div className="font-fraunces text-4xl lg:text-6xl text-primary">
              Visit us
            </div>
            <div className="font-questrial text-lg lg:text-xl text-primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
            <Button className={'rounded-full'}>Get directions</Button>
          </div>

          <div className="flex flex-col items-start gap-8 w-full h-full lg:w-[50%] lg:h-[80%]">
            <Image
              loading="lazy"
              height={700}
              width={700}
              src={'/assets/about-us/location-bg.webp'}
              className="h-full w-full object-cover"
            />
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default page;
