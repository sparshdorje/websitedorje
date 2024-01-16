'use client';

import { extractProductId } from '@/lib/utils';
import { addToCart } from '@/services/ShopifyService';
import { sendGTMEvent } from '@next/third-parties/google';
import { useState } from 'react';
import { toast } from 'sonner';
import MakeYourBlendOption from './MakeYourBlendOption';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Button } from './ui/button';

const MakeYourOwnBlendStepper = ({ product }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [processingOrder, setProcessingOrder] = useState(false);

  const steps = product?.options?.map((option) => {
    return {
      title: option.name,
      options: option.values,
    };
  });

  const variants = product?.variants?.edges?.map((variant) => {
    return variant.node;
  });

  const handlePlaceOrder = async () => {
    let matchingVariant = null;
    setProcessingOrder(true);

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
        matchingVariant = variant;
        break;
      }
    }

    if (matchingVariant) {
      const checkoutUrl = await addToCart(matchingVariant.id, 1);
      if (checkoutUrl) {
        sendGTMEvent({
          event: 'InitiateCheckout',
          num_items: 1,
          content_type: 'product_group',
          currency: 'INR',
          content_ids: [extractProductId(matchingVariant.id)],
          contents: [{ id: extractProductId(matchingVariant.id), quantity: 1 }],
          value: matchingVariant?.price?.amount,
          variantName: matchingVariant?.title,
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
        // Last step reached, perform the action or show the "Place Order" button
        handlePlaceOrder();
      }
    } else {
      alert('Please select an option before proceeding!');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <MaxWidthWrapper
        className={
          'mx-auto pt-8 pb-52 w-full grid grid-cols-1 gap-16 max-w-4xl'
        }
      >
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
      </MaxWidthWrapper>
      <div className="fixed bottom-0 p-4 border-t-2 border-[#F2E2D4] w-full bg-background">
        <MaxWidthWrapper
          className={'flex flex-col items-center max-w-4xl gap-4'}
        >
          <div className="bg-[#F2E2D4] px-4 py-2 w-full rounded-lg font-questrial text-sm text-primary font-semibold">
            Note: 1 option needs to be selected.
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
            <Button
              className="flex-1"
              onClick={handleNext}
              disabled={!selectedOptions[currentStep]}
            >
              {currentStep === steps.length - 1
                ? processingOrder
                  ? 'Processing...'
                  : 'Place Order'
                : 'Next'}
            </Button>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default MakeYourOwnBlendStepper;
