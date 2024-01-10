import BrandStorySlider from '@/components/BrandStorySlider';
import BrewingGuideSlider from '@/components/BrewingGuideSlider';
import Faq from '@/components/Faq';
import KnowYourTeaSlider from '@/components/KnowYourTeaSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductDetail from '@/components/ProductDetail';
import RelatedProduct from '@/components/RelatedProduct';
import ReviewCard from '@/components/ReviewCard';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import { HOME_PAGE_AS_SEEN_ON } from '@/config';
import ProductService from '@/services/product';
import Image from 'next/image';
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

  const product = (await fetchProduct(productHandle)) || {};

  console.log(product);

  // await delay(1000);

  return (
    <>
      <div className={'mx-auto pt-8 pb-52 w-full grid grid-cols-1 gap-32'}>
        {product && <ProductDetail product={product} />}

        {/* <div
          className="jdgm-widget jdgm-preview-badge h-[400px]"
          data-id={'7679953076449'}
        ></div> */}

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
              <ReviewCard />
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

// <MaxWidthWrapper className="lg:grid lg:grid-cols-2 lg:gap-8 lg:justify-between px-4 max-w-screen-xl">
// <div className="hidden lg:block col-6">
//   <div className="h-[600px] w-[520px] rounded-lg">
//     <ImageSlider urls={validUrls} />
//   </div>
// </div>
// <div className="col-6 flex flex-col justify-between items-start gap-4">
//   {/* TITLE AND DESCRIPTION */}
//   <div className="flex flex-col gap-4">
//     <div className="font-fraunces font-semibold text-xl lg:text-4xl text-primary">
//       {product.title}
//     </div>
//     <div>
//       <StarRating rating={3.3} totalRatings={238} />
//     </div>
//     <div className="mx-auto lg:hidden grid grid-cols-1 w-full">
//       <div className="h-[376px] rounded-lg">
//         <ImageSlider urls={validUrls} />
//       </div>
//     </div>
//     <div className="font-questrial text-base text-secondary">
//       {product.description}
//     </div>
//   </div>

//   {/* VARIANTS AND QUANTITY */}
//   <div className="flex flex-col gap-4">
//     {product?.options?.map((option, optionIdx) => (
//       <div className="flex flex-col gap-2" key={option.name}>
//         <div className="font-questrial text-primary">
//           {option.name === 'Quantity' ? 'Variant' : option.name}
//         </div>

//         <div className="flex items-center gap-2 flex-wrap">
//           {option?.values?.map((value, valueIdx) => (
//             <div
//               key={value}
//               onClick={() =>
//                 handleOptionSelect(optionIdx, option.name, value)
//               }
//               className={buttonVariants({
//                 variant: `${
//                   selectedOptions[optionIdx].value === value
//                     ? 'default'
//                     : 'outline'
//                 }`,
//                 className: `${
//                   selectedOptions[optionIdx].value === value
//                     ? 'bg-primary'
//                     : 'text-primary border-primary'
//                 } cursor-pointer font-questrial`,
//               })}
//             >
//               {value}
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}

//     <div>
//       <div className="font-questrial text-primary mb-3">Quantity</div>
//       <div className="flex items-center gap-3">
//         <Button
//           className="border-primary bg-primary text-white"
//           onClick={decreaseQuantity}
//         >
//           -
//         </Button>
//         <div
//           className={buttonVariants({
//             variant: 'outline',
//             className: 'border-primary w-10 h-10 font-questrial',
//           })}
//         >
//           {quantity}
//         </div>
//         <Button
//           className="border-primary bg-primary text-white"
//           onClick={increaseQuantity}
//         >
//           +
//         </Button>
//       </div>
//     </div>
//   </div>

//   {/* BUY AND ADD TO CART DESKTOP*/}
//   <div className="hidden lg:flex justify-between gap-3 w-full">
//     <Button
//       onClick={() => handleBuyNow()}
//       className="border border-secondary bg-secondary text-white flex-1 lg:text-lg py-6"
//     >
//       Buy Now
//     </Button>
//     <AddToCartButton product={selectedVariant} quantity={quantity} />
//   </div>
// </div>
// </MaxWidthWrapper>
