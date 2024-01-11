'use client';

import AddToCartButton from '@/components/AddToCartButton';
import ImageSlider from '@/components/ImageSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import StarRating from '@/components/StarRating';
import { Button, buttonVariants } from '@/components/ui/button';
import { addToCart } from '@/services/ShopifyService';
import { useEffect, useState } from 'react';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState({});

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

  useEffect(() => {
    setVariants(() => {
      return product?.variants?.edges?.map((variant) => {
        return variant.node;
      });
    });

    product?.options?.map((option, optionIdx) => {
      handleOptionSelect(optionIdx, option.name, option.values?.[0]);
    });
  }, []);

  useEffect(() => {
    findMatchingVariant();
  }, [selectedOptions]);

  const validUrls =
    product?.images?.edges?.map((image) => image?.node?.url) || [];
  return (
    <>
      <MaxWidthWrapper className="lg:grid lg:grid-cols-2 lg:gap-8 lg:justify-between px-4 max-w-screen-xl">
        <div className="hidden lg:block col-6">
          <div className="h-[600px] w-[520px] rounded-lg">
            <ImageSlider urls={validUrls} />
          </div>
        </div>
        <div className="col-6 flex flex-col justify-between items-start gap-4">
          {/* TITLE AND DESCRIPTION */}
          <div className="flex flex-col gap-4">
            <div className="font-fraunces font-semibold text-2xl lg:text-4xl text-primary">
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
                          selectedOptions[optionIdx]?.value === value
                            ? 'default'
                            : 'outline'
                        }`,
                        className: `${
                          selectedOptions[optionIdx]?.value === value
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

export default ProductDetail;
