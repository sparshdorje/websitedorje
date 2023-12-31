'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { Menu, UserRound, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';

const MobileNav = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();

  const pathname = usePathname();

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    );

  return (
    <div className="w-screen h-screen">
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed overflow-y-scroll overscroll-y-none w-full h-full inset-0 z-40 flex">
        <div className="w-full h-full">
          <div className="relative flex w-full h-full max-w-sm flex-col justify-between overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="mt-2 px-4">
              <div className="flex justify-between items-center pb-2 pt-5">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
                {user && (
                  <Link href="/account">
                    <UserRound className="h-6 w-6 flex-shrink-0 text-gray-400 hover:text-gray-500" />
                  </Link>
                )}
              </div>
              {PRODUCT_CATEGORIES.map((category) => (
                <Accordion key={category.label} type="single" collapsible>
                  <AccordionItem value={category.label}>
                    <AccordionTrigger>
                      <p className="border-transparent text-gray-900 border-b-2 text-base font-medium">
                        {category.label}
                      </p>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-sm"
                          >
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                              <Image
                                fill
                                src={item.imageSrc}
                                alt="product category image"
                                className="object-cover object-center"
                              />
                            </div>
                            <Link
                              href={item.href}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              {item.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>

            {user ? (
              <div className="border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <Link
                    onClick={() => closeOnCurrent('/sign-in')}
                    href="/sign-in"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign in
                  </Link>
                </div>
                <div className="flow-root">
                  <Link
                    onClick={() => closeOnCurrent('/sign-up')}
                    href="/sign-up"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            ) : (
              <div className="px-4 py-6">
                <Button className="w-fit " onClick={signOut}>
                  Log out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
