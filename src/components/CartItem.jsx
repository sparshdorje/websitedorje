'use client';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

const CartItem = ({ product }) => {
  const { image } = product;

  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {image?.url ? (
              <Image
                loading="lazy"
                src={image.url}
                alt={product.product.title}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1 font-fraunces">
              {product.product.title}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground font-questrial mb-1">
              {product.title}
            </span>

            <div className="flex items-center gap-3">
              <Button
                className="flex items-center justify-center border-primary w-5 h-5 p-1 bg-primary text-white"
                onClick={() => decreaseQuantity(product.id)}
                disabled={product.quantity === 1}
              >
                -
              </Button>
              <div className="font-questrial w-2">{product.quantity}</div>
              <Button
                className="flex items-center justify-center border-primary w-5 p-1 h-5 bg-primary text-white"
                onClick={() => increaseQuantity(product.id)}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col font-medium">
          <div className="mb-3 text-xs text-muted-foreground">
            <button
              onClick={() => removeItem(product.id)}
              className="flex items-center gap-0.5"
            >
              <X className="w-3 h-4" />
              Remove
            </button>
          </div>
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product.price.amount * product.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
