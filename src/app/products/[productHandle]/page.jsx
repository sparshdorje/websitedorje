'use client';

import ImageSlider from '@/components/ImageSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import BrandStorySlider from '@/components/BrandStorySlider';
import BrewingGuideSlider from '@/components/BrewingGuideSlider';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import KnowYourTeaSlider from '@/components/KnowYourTeaSlider';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';
import RelatedProductCard from '@/components/RelatedProductCard';
import Faq from '@/components/Faq';
import AddToCartButton from '@/components/AddToCartButton';
import { addToCart, judgeMeInstance } from '@/services/ShopifyService';
import ProductService from '@/services/product';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { HOME_PAGE_AS_SEEN_ON } from '@/config';
import Image from 'next/image';

const Page = ({ params }) => {
  const { productHandle } = params;
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState({});

  // Function to handle selecting an option value
  const handleOptionSelect = (optionIdx, optionName, value) => {
    setSelectedOptions((prevState) => {
      return {
        ...prevState,
        [optionIdx]: { name: optionName, value },
      };
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  async function fetchProduct() {
    try {
      const response = await ProductService.getProductByHandle({
        productHandle,
      });

      setProduct(response.data.data.product);

      setVariants(() => {
        return response.data.data.product?.variants?.edges?.map((variant) => {
          return variant.node;
        });
      });

      response.data.data.product?.options.map((option, optionIdx) => {
        handleOptionSelect(optionIdx, option.name, option.values?.[0]);
      });
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  async function fetchRelatedProduct(productId) {
    try {
      const response = await ProductService.getRelatedProduct({
        productId,
      });

      setRelatedProducts(response.data.data.productRecommendations.slice(0, 4));
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchRelatedProduct(product.id);
  }, [product]);

  useEffect(() => {
    findMatchingVariant();
  }, [selectedOptions]);

  const findMatchingVariant = () => {
    for (const variant of variants) {
      let isMatch = true;

      for (const key in selectedOptions) {
        if (
          !variant.selectedOptions.some(
            (option) =>
              option.name === selectedOptions[key].name &&
              option.value === selectedOptions[key].value
          )
        ) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        setSelectedVariant(variant);
        break;
      }
    }
  };

  const handleBuyNow = async () => {
    const checkoutUrl = await addToCart(selectedVariant.id, quantity);

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      // Redirect to the checkout page
    } else {
      console.error('Failed to add the product to the cart.');
    }
  };

  const validUrls =
    product?.images?.edges?.map((image) => image?.node?.url) || [];

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta property="og:title" content={product.title} key="title" />
      </Head>
      <div className={'mx-auto pt-8 pb-52 w-full grid grid-cols-1 gap-32'}>
        <MaxWidthWrapper className="lg:grid lg:grid-cols-2 lg:gap-8 lg:justify-between px-4 max-w-screen-xl">
          <div className="hidden lg:block col-6">
            <div className="h-[600px] w-[520px] rounded-lg">
              <ImageSlider urls={validUrls} />
            </div>
          </div>
          <div className="col-6 flex flex-col justify-between items-start gap-4">
            {/* TITLE AND DESCRIPTION */}
            <div className="flex flex-col gap-4">
              <div className="font-fraunces font-semibold text-xl lg:text-4xl text-primary">
                {product.title}
              </div>
              <div>
                <StarRating rating={3.3} totalRatings={238} />
              </div>
              <div className="mx-auto lg:hidden grid grid-cols-1 w-full">
                <div className="h-[376px] rounded-lg">
                  <ImageSlider urls={validUrls} />
                </div>
              </div>
              <div className="font-questrial text-base text-secondary">
                {product.description}
              </div>
            </div>

            {/* VARIANTS AND QUANTITY */}
            <div className="flex flex-col gap-4">
              {product?.options?.map((option, optionIdx) => (
                <div className="flex flex-col gap-2" key={option.name}>
                  <div className="font-questrial text-primary">
                    {option.name === 'Quantity' ? 'Variant' : option.name}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {option?.values?.map((value, valueIdx) => (
                      <div
                        key={value}
                        onClick={() =>
                          handleOptionSelect(optionIdx, option.name, value)
                        }
                        className={buttonVariants({
                          variant: `${
                            selectedOptions[optionIdx].value === value
                              ? 'default'
                              : 'outline'
                          }`,
                          className: `${
                            selectedOptions[optionIdx].value === value
                              ? 'bg-primary'
                              : 'text-primary border-primary'
                          } cursor-pointer font-questrial`,
                        })}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <div className="font-questrial text-primary mb-3">Quantity</div>
                <div className="flex items-center gap-3">
                  <Button
                    className="border-primary bg-primary text-white"
                    onClick={decreaseQuantity}
                  >
                    -
                  </Button>
                  <div
                    className={buttonVariants({
                      variant: 'outline',
                      className: 'border-primary w-10 h-10 font-questrial',
                    })}
                  >
                    {quantity}
                  </div>
                  <Button
                    className="border-primary bg-primary text-white"
                    onClick={increaseQuantity}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* BUY AND ADD TO CART DESKTOP*/}
            <div className="hidden lg:flex justify-between gap-3 w-full">
              <Button
                onClick={() => handleBuyNow()}
                className="border border-secondary bg-secondary text-white flex-1 lg:text-lg py-6"
              >
                Buy Now
              </Button>
              <AddToCartButton product={selectedVariant} quantity={quantity} />
            </div>
          </div>
        </MaxWidthWrapper>

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
      {relatedProducts.length > 0 && (
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

            <div className="mx-auto flex items-start justify-start overflow-x-scroll lg:justify-center gap-6">
              {relatedProducts?.map((product) => (
                <RelatedProductCard key={product.id} product={product} />
              ))}
            </div>
          </MaxWidthWrapper>
        </div>
      )}

      {/* BUY AND ADD TO CART MOBILE*/}
      <div className="z-50 fixed bottom-0 bg-background p-2 flex lg:hidden justify-center gap-3 w-screen">
        <Button
          onClick={() => handleBuyNow()}
          className="border border-secondary bg-secondary text-white flex-1 lg:text-lg py-6"
        >
          Buy Now
        </Button>
        <AddToCartButton product={selectedVariant} quantity={quantity} />
      </div>
    </>
  );
};

export default Page;
