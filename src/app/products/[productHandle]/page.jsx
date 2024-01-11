import BrandStorySlider from '@/components/BrandStorySlider';
import BrewingGuideSlider from '@/components/BrewingGuideSlider';
import Faq from '@/components/Faq';
import KnowYourTeaSlider from '@/components/KnowYourTeaSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductDetail from '@/components/ProductDetail';
import RelatedProduct from '@/components/RelatedProduct';
import ReviewCard from '@/components/ReviewCard';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import { Button } from '@/components/ui/button';
import { HOME_PAGE_AS_SEEN_ON } from '@/config';
import { extractProductId } from '@/lib/utils';
import { judgeMeInstance } from '@/services/ShopifyService';
import ProductService from '@/services/product';
import RatingService from '@/services/rating';
import axios from 'axios';
import Image from 'next/image';
import { redirect } from 'next/navigation';
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

// export async function generateStaticParams() {
//   try {
//     const response = await ProductService.getAllProducts();

//     return response?.data?.data?.products?.edges
//       ?.map((product) => {
//         return product?.node?.handle;
//       })
//       .slice(0, 20);
//   } catch (error) {
//     console.error('Error fetching product:', error);
//   }
// }

const fetchRatingData = async (productId) => {
  try {
    const response = await RatingService.getAverageRating(productId);
    return response;
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

const fetchReviewData = async (productId) => {
  try {
    const response = await RatingService.getProductReview(productId);
    return response;
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

export async function generateMetadata({ params: { productHandle } }) {
  const product = await fetchProduct(productHandle);
  const { title, description, images } = product || {};

  return {
    title,
    description,
    openGraph: {
      images: [{ url: images?.edges?.[0]?.node?.url }],
    },
  };
}

const Page = async ({ params }) => {
  const { productHandle } = params;

  if (productHandle === 'make-your-blend') {
    redirect('/make-your-own-blend');
  }

  const product = (await fetchProduct(productHandle)) || {};
  const productId = extractProductId(product.id);
  const ratingData = await fetchRatingData(productId);
  const reviewData = (await fetchReviewData(productId)) || [];

  // await delay(1000);

  return (
    <>
      <div className={'mx-auto pt-8 pb-52 w-full grid grid-cols-1 gap-24'}>
        {product && <ProductDetail product={product} ratingData={ratingData} />}

        {/* KNOW YOUR TEA */}
        <div
          style={{
            width: '100%',
            height: '100%', // Set your desired height
            background: `url(/assets/svg/ProductPageBG.svg) no-repeat`,
            backgroundSize: 'cover',
          }}
          className="py-16"
        >
          <MaxWidthWrapper className={'max-w-screen-xl'}>
            <div className="text-3xl text-center mb-3 font-fraunces text-white font-semibold">
              Know your tea
            </div>
            <div className="text-base text-center mb-10 font-questrial text-white">
              Understand the composition of your favourite tea
            </div>
            <KnowYourTeaSlider productHandle={product.handle} />
          </MaxWidthWrapper>
        </div>

        {/* BRAND STORY */}
        <div>
          <MaxWidthWrapper className={'max-w-screen-xl'}>
            <div className="text-3xl text-center mb-3 font-fraunces text-primary font-semibold">
              What makes Dorje Special
            </div>
            <div className="text-base text-center mb-10 font-questrial">
              Learn the story behind the brewing of the wonderful Himalayan tea
            </div>
            <BrandStorySlider />
          </MaxWidthWrapper>
        </div>

        {/* AS SEEN ON */}
        <div
          style={{
            width: '100%',
            height: '100%', // Set your desired height
            background: `url(/assets/svg/ProductPageAsSeenOnBG.svg) no-repeat`,
            backgroundSize: 'cover',
          }}
          className="py-16"
        >
          <div className="text-3xl text-center mb-8 font-fraunces text-white font-semibold">
            As seen on
          </div>
          <div className="w-ful py-6">
            <MaxWidthWrapper
              className={
                'flex items-center justify-between lg:justify-center lg:gap-12 max-w-screen-xl'
              }
            >
              {HOME_PAGE_AS_SEEN_ON.map((imgSrc, idx) => (
                <Image
                  key={imgSrc}
                  src={'/assets/icons/shark-tank.png'}
                  width={100}
                  height={100}
                  loading="lazy"
                  className="h-[80px] lg:h-[100px] object-contain"
                />
              ))}
            </MaxWidthWrapper>
          </div>
        </div>

        {/* BREWING GUIDE */}
        <div>
          <MaxWidthWrapper className={'max-w-screen-xl'}>
            <div className="text-3xl text-center mb-3 font-fraunces text-primary font-semibold">
              Brewing guide
            </div>
            <div className="text-base text-center mb-10 font-questrial">
              Learn the story behind the brewing of the wonderful Himalayan tea
            </div>
            <BrewingGuideSlider productHandle={product.handle} />
          </MaxWidthWrapper>
        </div>

        {/* TESTIMONIALS */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `url(/assets/svg/ProductPageBG.svg) no-repeat`,
            backgroundSize: 'cover',
          }}
          className="py-16"
        >
          <MaxWidthWrapper className={'max-w-screen-xl'}>
            <div className="text-3xl text-center mb-3 font-fraunces text-white font-semibold">
              Hear what people say about us
            </div>
            <div className="text-base text-center mb-10 font-questrial text-white">
              Here’s what people of the industry say about us
            </div>
            <TestimonialsSlider />
          </MaxWidthWrapper>
        </div>

        {/* CUSTOMER REVIEWS */}
        <div>
          <MaxWidthWrapper className={'max-w-screen-xl'}>
            <div className="text-3xl text-center mb-3 font-fraunces text-primary font-semibold">
              Customer Reviews
            </div>
            <div className="text-base text-center mb-10 font-questrial">
              Hear what our fans say about us
            </div>

            <div className="max-w-4xl mx-auto">
              {reviewData.length > 0 ? (
                reviewData?.map((review, idx) => (
                  <ReviewCard key={idx} review={review} />
                ))
              ) : (
                <div className="flex justify-center">
                  <Button className={'rounded-full'}>
                    Be the first one to review
                  </Button>
                </div>
              )}
            </div>
          </MaxWidthWrapper>
        </div>

        {/* FAQs */}
        <div>
          <MaxWidthWrapper className={'max-w-screen-xl'}>
            <div className="text-3xl text-center mb-3 font-fraunces text-primary font-semibold">
              FAQs
            </div>

            <div className="max-w-4xl mx-auto">
              <Faq />
            </div>
          </MaxWidthWrapper>
        </div>
      </div>

      {/* RELATED PRODUCTS */}

      <div
        style={{
          width: '100%',
          height: '100%',
          background: `url(/assets/svg/ProductPageBG.svg) no-repeat`,
          backgroundSize: 'cover',
        }}
        className="py-16 mb-12 lg:mb-0"
      >
        <MaxWidthWrapper className={'max-w-screen-xl'}>
          <div className="text-3xl text-center mb-3 font-fraunces text-white font-semibold">
            Related products
          </div>
          <div className="text-base text-center mb-10 font-questrial text-white ">
            People also bought...
          </div>
          <RelatedProduct productId={product.id} />
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default Page;
