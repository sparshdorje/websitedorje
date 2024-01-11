'use client';

import { ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import CartItem from '@/components/CartItem';
import { buttonVariants } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import CartService from '@/services/cart';

// import { ScrollArea } from './ui/scroll-area';
// import CartItem from './CartItem';
import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;

  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const continueToCheckout = async () => {
    try {
      setIsLoading(true);
      const lineItems = items.map((item) => {
        return {
          quantity: item.product.quantity,
          merchandiseId: item.product.id,
        };
      });

      const cartResponse = await CartService.createCartWithLineItems(lineItems);

      const checkoutUrl =
        cartResponse?.data?.data?.cartCreate?.cart?.checkoutUrl || '';

      if (checkoutUrl !== '') {
        router.push(checkoutUrl);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price.amount * product.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col lg:pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({isMounted ? itemCount : 0})</SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ScrollArea>
            </div>

            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <div className="flex-1">Total</div>
                  <div>{formatPrice(cartTotal)}</div>
                </div>
                <div className="font-questrial text-primary text-xs text-end">
                  * Shipping Calculated at checkout
                </div>
              </div>
            </div>
            <SheetFooter>
              <div
                onClick={continueToCheckout}
                className={buttonVariants({
                  className: 'w-full cursor-pointer',
                })}
              >
                {isLoading ? 'Processing...' : 'Continue to Checkout'}
              </div>
            </SheetFooter>
          </>
        ) : (
          <>
            <div className="flex h-full flex-col items-center justify-center space-y-1">
              <div
                aria-hidden="true"
                className="relative mb-4 h-60 w-60 text-muted-foreground"
              >
                <Image loading="lazy" src="/" fill alt="empty shopping cart" />
              </div>
              <div className="text-xl font-semibold">Your cart is empty</div>
              <SheetTrigger asChild>
                <Link
                  href="/products"
                  className={buttonVariants({
                    variant: 'link',
                    size: 'sm',
                    className: 'text-sm text-muted-foreground',
                  })}
                >
                  Add items to your cart to checkout
                </Link>
              </SheetTrigger>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
