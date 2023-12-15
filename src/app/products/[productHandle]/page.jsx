'use client';

import ImageSlider from '@/components/ImageSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import AddToCartButton from '@/components/AddToCartButton';
import { addToCart } from '@/services/ShopifyService';
import ProductService from '@/services/product';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const Page = ({ params }) => {
  const { productHandle } = params;
  const [product, setProduct] = useState({});
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

      console.log(response.data.data);
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

  useEffect(() => {
    fetchProduct();
  }, []);

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

  console.log(variants, 'variants');
  console.log(selectedOptions, 'option');
  console.log(selectedVariant, 'selectedVariant');

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
      <MaxWidthWrapper className={'py-8 px-4 w-full max-w-screen-xl'}>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:justify-between">
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
                              ? 'bg-secondary-dark'
                              : 'text-secondary-dark border-secondary-dark'
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
                    className="border-secondary-dark bg-secondary-dark text-white"
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
                    className="border-secondary-dark bg-secondary-dark text-white"
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
                className="border border-secondary-dark bg-secondary-dark text-white flex-1 lg:text-lg py-6"
              >
                Buy Now
              </Button>
              <AddToCartButton product={selectedVariant} quantity={quantity} />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      {/* BUY AND ADD TO CART MOBILE*/}
      <div className="fixed bottom-0 bg-background p-2 flex lg:hidden justify-center gap-3 w-screen">
        <Button
          onClick={() => handleBuyNow()}
          className="border border-secondary-dark bg-secondary-dark text-white flex-1 lg:text-lg py-6"
        >
          Buy Now
        </Button>
        <AddToCartButton product={selectedVariant} quantity={quantity} />
      </div>
    </>
  );
};

export default Page;
