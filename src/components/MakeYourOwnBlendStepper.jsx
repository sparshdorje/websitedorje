'use client';

import { extractProductId, formatPrice } from '@/lib/utils';
import { addToCart } from '@/services/ShopifyService';
import { sendGTMEvent } from '@next/third-parties/google';
import { useState } from 'react';
import { toast } from 'sonner';
import MakeYourBlendOption from './MakeYourBlendOption';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Button, buttonVariants } from './ui/button';

const MakeYourOwnBlendStepper = ({ product }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [showBlendPreview, setShowBlendPreview] = useState(false);
  const [matchingVariant, setMatchingVariant] = useState({});

  const steps = product?.options?.map((option) => {
    return {
      title: option.name,
      options: option.values,
    };
  });

  const variants = product?.variants?.edges?.map((variant) => {
    return variant.node;
  });

  const allStepsCompleted = selectedOptions.length === steps.length;

  const getMatchingVariant = () => {
    // Check Matching variant
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
        setMatchingVariant(variant);
        break;
      }
    }
  };

  const handlePlaceOrder = async () => {
    setProcessingOrder(true);

    if (matchingVariant) {
      const checkoutUrl = await addToCart(matchingVariant.id, 1);
      if (checkoutUrl) {
        sendGTMEvent({
          event: 'InitiateCheckout',
          num_items: 1,
          content_type: 'product_group',
          currency: 'INR',
          content_ids: [extractProductId(matchingVariant.id)],
          contents: JSON.stringify([
            { id: extractProductId(matchingVariant.id), quantity: 1 },
          ]),
          value: matchingVariant?.price?.amount,
          variantName: matchingVariant?.title,
          eventID: parseInt(Math.random() * 10000000000),
        });

        window.location.href = checkoutUrl;
      } else {
        setProcessingOrder(false);
        toast.error('Failed to add the product to the cart.');
      }
    } else {
      toast.error('Something Went Wrong');
    }
  };

  const handleOptionSelect = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentStep] = {
      name: steps[currentStep].title,
      value: option,
    };
    setSelectedOptions(updatedOptions);
  };

  const handleNext = () => {
    if (selectedOptions[currentStep]) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        if (allStepsCompleted) {
          // Show the preview
          setShowBlendPreview(true);
          getMatchingVariant();
        }
      }
    } else {
      alert('Please select an option before proceeding!');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      if (showBlendPreview) {
        setShowBlendPreview(false);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  return (
    <>
      <MaxWidthWrapper
        className={
          'mx-auto pt-8 pb-52 w-full grid grid-cols-1 gap-12 lg:gap-16 max-w-4xl'
        }
      >
        {!showBlendPreview ? (
          <>
            <div className="flex justify-between items-center">
              <div className="font-fraunces text-xl text-primary font-semibold">
                {steps[currentStep].title}
              </div>
              <div className="font-questrial text-base text-primary opacity-75 font-medium">
                step {currentStep + 1}/{steps.length}
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              {steps[currentStep].options.map((option, index) => (
                <MakeYourBlendOption
                  name={option}
                  key={index}
                  selected={selectedOptions[currentStep]?.value === option}
                  handleSelect={handleOptionSelect}
                />
              ))}
            </div>
          </>
        ) : (
          // BLEND PREVIEW
          <>
            <div className="font-fraunces text-xl text-primary font-semibold">
              Your Blend Preview
            </div>

            <div className="flex flex-col items-start gap-4 w-full">
              <div className="font-questrial text-lg text-primary font-medium">
                Selected Blend
              </div>
              <div className="flex gap-4 flex-wrap w-full">
                {selectedOptions.map((option, index) => (
                  <MakeYourBlendOption
                    name={option.value}
                    key={index}
                    selected={true}
                    clickable={false}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="font-questrial text-lg text-primary font-medium">
                Size
              </div>
              <div
                className={buttonVariants({ className: 'cursor-not-allowed' })}
              >
                100gm
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="font-questrial text-lg text-primary font-medium">
                Price
              </div>
              <div className="font-questrial font-semibold text-lg  text-primary">
                {formatPrice(matchingVariant?.price?.amount)}
                <span className="text-xs font-questrial text-gray-600 ml-2">
                  (Tax Included)
                </span>
              </div>
            </div>
          </>
        )}
      </MaxWidthWrapper>
      <div className="fixed bottom-0 p-4 border-t-2 border-[#F2E2D4] w-full bg-background">
        <MaxWidthWrapper
          className={'flex flex-col items-center max-w-4xl gap-4'}
        >
          <div className="bg-[#F2E2D4] px-4 py-2 w-full rounded-lg font-questrial text-sm text-primary font-semibold">
            {!showBlendPreview
              ? 'Note: 1 option needs to be selected.'
              : 'Place Order to continue'}
          </div>

          <div className={'flex justify-between gap-6 w-full'}>
            <Button
              className="flex-1 text-primary border-primary"
              onClick={handleBack}
              disabled={currentStep === 0}
              variant="outline"
            >
              Back
            </Button>
            {!showBlendPreview ? (
              <Button
                className="flex-1"
                onClick={handleNext}
                disabled={!selectedOptions[currentStep]}
              >
                Next
              </Button>
            ) : (
              <Button
                className="flex-1"
                onClick={handlePlaceOrder}
                disabled={!selectedOptions[currentStep]}
              >
                {processingOrder ? 'Processing...' : 'Place Order'}
              </Button>
            )}
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default MakeYourOwnBlendStepper;
