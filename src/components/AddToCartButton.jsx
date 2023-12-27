'use client';

import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const AddToCartButton = ({ product, quantity }) => {
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
      onClick={() => {
        addItem({ ...product, quantity });
        setIsSuccess(true);
      }}
      variant="outline"
      className="border-secondary text-secondary flex-1 lg:text-lg py-6"
    >
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  );
};

export default AddToCartButton;
