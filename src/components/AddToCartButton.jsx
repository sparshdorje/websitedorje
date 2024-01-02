'use client';

import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const AddToCartButton = ({
  product,
  quantity,
  extraClasses,
  variant = 'outline',
}) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

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
