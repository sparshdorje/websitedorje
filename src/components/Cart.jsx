'use client';

import CartItem from '@/components/CartItem';
import { extractProductId, formatPrice } from '@/lib/utils';
import CartService from '@/services/cart';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { ASSETS } from '@/config';
import { useCart } from '@/hooks/useCart';
import { sendGTMEvent } from '@next/third-parties/google';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import RelatedProduct from './RelatedProduct';

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;

  // FOR GTM DATA LAYER //
  const contents = items.map((item) => {
    return {
      id: extractProductId(item.product.id),
      quantity: item.product.quantity,
    };
  });
  const variant_names = items.map((item) => {
    return item?.product?.title;
  });
  const content_ids = items.map((item) => {
    const productId = extractProductId(item.product.id);
    return productId;
  });
  // FOR GTM DATA LAYER //

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetKey, setSheetKey] = useState(0); // Add sheetKey state

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price.amount * product.quantity,
    0
  );

  const continueToCheckout = async () => {
    try {
      setIsLoading(true);
      const lineItems = items.map((item) => {
        return {
          quantity: item.product.quantity,
          merchandiseId: item.product.id,
        };
      });

      sendGTMEvent({
        event: 'InitiateCheckout',
        num_items: itemCount,
        content_type: 'product_group',
        currency: 'INR',
        content_ids,
        contents,
        value: cartTotal,
        variant_names,
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

  const sendViewCartEvent = () => {
    sendGTMEvent({
      event: 'ViewCart',
      currency: 'INR',
      content_ids,
      contents,
      content_type: 'product_group',
      value: cartTotal,
    });
  };

  useLayoutEffect(() => {
    setIsMounted(true);

    if (searchParams.get('openCart') === 'true') {
      setIsSheetOpen(true);
      router.replace(pathname, { scroll: false });
      setSheetKey((prevKey) => prevKey + 1);
    }
  }, [searchParams, pathname]);

  return (
    <Sheet key={sheetKey} defaultOpen={isSheetOpen} className="max-h-screen ">
      <SheetTrigger
        onClick={() => {
          sendViewCartEvent();
          setIsSheetOpen(true);
        }}
        className="group -m-2 flex items-center p-2"
      >
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          ({isMounted ? itemCount : 0})
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col lg:pr-0 sm:max-w-lg overflow-y-scroll px-0">
        <SheetHeader className="space-y-2.5 pr-6 pl-2 lg:pl-4 ">
          <SheetTitle>Cart ({isMounted ? itemCount : 0})</SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6 pl-2 lg:pl-4">
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem
                    product={product}
                    key={product.id}
                    setIsSheetOpen={setIsSheetOpen}
                    setSheetKey={setSheetKey}
                    sheetKey={sheetKey}
                  />
                ))}
              </ScrollArea>
            </div>

            <div className="space-y-4 pr-6 pl-2 lg:pl-4">
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
            <SheetFooter
              className={'lg:pr-2 flex !flex-col items-start w-full gap-6'}
            >
              <div className="w-full px-2">
                <div
                  onClick={continueToCheckout}
                  className={buttonVariants({
                    className: 'w-full cursor-pointer',
                  })}
                >
                  {isLoading ? 'Processing...' : 'Continue to Checkout'}
                </div>
              </div>

              <div className="flex flex-col items-start w-full">
                <div className="text-lg px-2 lg:pl-4 text-center mb-4 font-fraunces text-primary font-semibold">
                  People also bought...
                </div>
                <div className="w-full lg:pl-4">
                  <RelatedProduct
                    productId={items?.[0]?.product?.product?.id}
                    className="flex items-start justify-start overflow-x-scroll lg:overflow-x-auto lg:justify-between lg:flex-wrap gap-6 px-2.5 lg:px-0 lg:pr-4"
                    ratingCardVariant="dark"
                  />
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <>
            <div className="flex h-full flex-col items-center justify-center space-y-1">
              <div
                aria-hidden="true"
                className="relative mb-4 h-40 w-40 text-muted-foreground"
              >
                <Image
                  loading="lazy"
                  src={`${ASSETS.ICONS}/dorje-logo.png`}
                  fill
                  alt="empty shopping cart"
                />
              </div>
              <div className="text-xl font-semibold">Your cart is empty</div>
              <SheetTrigger asChild>
                <Link
                  href="/collections/shop-all"
                  className={buttonVariants({
                    variant: 'link',
                    size: 'sm',
                    className: 'text-sm text-muted-foreground underline',
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
