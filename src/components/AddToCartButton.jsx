'use client';

import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { cn, extractProductId } from '@/lib/utils';
import { sendGTMEvent } from '@next/third-parties/google';

const AddToCartButton = ({
  product,
  quantity,
  extraClasses,
  variant = 'outline',
}) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const sendAddToCartEvent = () => {
    const productId = extractProductId(product.id) || '';
    sendGTMEvent({
      event: 'AddToCart',
      quantity,
      productName: product.product.title,
      price: product.price.amount,
      variant: product.title,
      value: product?.product?.title,
      productId,
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        addItem({ ...product, quantity });
        sendAddToCartEvent();
        setIsSuccess(true);
      }}
      variant={variant}
      className={cn(
        'border-secondary z-30 text-secondary flex-1 lg:text-lg py-6',
        extraClasses
      )}
    >
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  );
};

export default AddToCartButton;
