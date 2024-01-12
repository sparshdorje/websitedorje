import BestsellerCard from '@/components/BestsellerCard';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { APP_CONSTATNTS } from '@/config';
import ProductService from '@/services/product';
import Image from 'next/image';
import Link from 'next/link';

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
            <Link
              target="_blank"
              href={`${APP_CONSTATNTS.SHOPYFY_URL}/pages/our-farms`}
            >
              <Button className={'rounded-full'}>Read More</Button>
            </Link>
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
            <Link
              target="_blank"
              href={`${APP_CONSTATNTS.SHOPYFY_URL}/pages/our-story`}
            >
              <Button className={'rounded-full'}>Read More</Button>
            </Link>
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
            <Link
              target="_blank"
              href={'https://maps.app.goo.gl/YyJf6zZaexiWYGZHA'}
            ></Link>
            <Button className={'rounded-full'}>Get directions</Button>
          </div>

          <div className="flex flex-col items-start gap-8 w-full h-full lg:w-[50%] lg:h-[80%]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.002469406912!2d88.31649677608554!3d26.83987376321578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e437490e145cb1%3A0x223b23961dc9790c!2sDorje%20Teas!5e0!3m2!1sen!2sin!4v1705060307496!5m2!1sen!2sin"
              loading="lazy"
              className="h-full w-full object-cover"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default page;
