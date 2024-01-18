'use client';

import { useCart } from '@/hooks/useCart';
import { cn, extractProductId } from '@/lib/utils';
import { sendGTMEvent } from '@next/third-parties/google';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const AddToCartButton = ({
  product,
  quantity,
  extraClasses,
  variant = 'outline',
}) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const sendAddToCartEvent = () => {
    const productId = extractProductId(product.id) || '';
    sendGTMEvent({
      event: 'AddToCart',
      num_items: quantity,
      content_name: product.product.title,
      price: parseInt(product.price.amount),
      variant: product.title,
      value: parseInt(product.price.amount),
      contents: [{ id: productId, quantity }],
      content_type: 'product_group',
      content_ids: [productId],
      currency: 'INR',
      eventID: Math.random(),
    });
  };

  const openCart = () => {
    router.replace(`?openCart=true`, { scroll: false });
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
        openCart();
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
