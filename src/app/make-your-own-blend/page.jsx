import { Button } from '@/components/ui/button';
import ProductService from '@/services/product';
import Image from 'next/image';
import Link from 'next/link';
import React, { cache } from 'react';

const fetchProduct = cache(async (productHandle) => {
  try {
    const response = await ProductService.getProductByHandle({
      productHandle,
    });

    return response.data.data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
});

export async function generateMetadata() {
  const product = await fetchProduct('make-your-blend');
  const { title, description, images } = product || {};

  return {
    title,
    description,
    openGraph: {
      images: [{ url: images?.edges?.[0]?.node?.url }],
      title,
      description,
      url: `https://dorjeteas.com/make-your-own-blend`,
      siteName: 'Dorje Teas',
    },
  };
}

const page = () => {
  return (
    <div
      className={
        'pb-0 lg:pb-52 w-full flex flex-col items-center gap-24 min-h-screen'
      }
    >
      <div className="bg-[#679FA1] relative bg-opacity-50 w-full h-[300px] lg:h-[400px]">
        <Image
          src={'/assets/make-your-own-blend/banner.webp'}
          height={700}
          width={700}
          loading="lazy"
          alt="banner"
          className="h-full w-full object-cover"
        />

        <div className="absolute -bottom-26 min-h-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-fit bg-white flex items-center border border-gray-300 shadow-md justify-center px-6 py-6 lg:py-8">
          <div className="font-fraunces text-center text-bold text-2xl lg:text-5xl">
            Make Your Blend
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full gap-5 text-center">
        <div className="font-questrial text-primary font-semibold text-xl">
          Welcome to darjeeling, we allow <br /> you to prepare your own blend.
        </div>
        <div className="font-questrial text-primary text-opacity-70 font-semibold text-base">
          Make your blend by choosing <br /> different flavours of tea
        </div>
        <Link href={'/make-your-own-blend/start'}>
          <Button className="py-6 px-16">
            <div className="text-xl w-52 ">Start</div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
