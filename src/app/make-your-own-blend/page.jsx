import { Button } from '@/components/ui/button';
import ProductService from '@/services/product';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';

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
      <div className="bg-[#679FA1] relative bg-opacity-50 w-full h-[300px] lg:h-[430px]">
        <Image
          src={'/assets/make-your-own-blend/banner.webp'}
          height={1000}
          width={1000}
          loading="lazy"
          alt="banner"
          className="h-full w-full object-cover object-center"
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
          Make your blend by choosing <br /> different flavours of tea.
        </div>
        <Link href={'/make-your-own-blend/start'}>
          <Button className="py-6 px-16">
            <div className="text-xl w-52 ">Start</div>
          </Button>
        </Link>
        <div className="w-full h-fit py-3 px-3 text-center bg-[#f1ddcc] flex items-center justify-center flex-wrap">
          <div className="font-questrial text-primary font-semibold text-sm lg:text-base">
            NOTE: All your Teas are being freshly blended. It will be dispatched
            in 3-4 days of us receiving your order.
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
