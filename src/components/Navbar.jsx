import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/button';
import MaxWidthWrapper from './MaxWidthWrapper';
import NavItems from './NavItems';
import MobileNav from './MobileNav';
import DorjeLogo from '../../public/assets/icons/dorje-logo.png';
import Image from 'next/image';
import Cart from './Cart';
import { UserRound } from 'lucide-react';
import { getServerSideUser } from '@/lib/utils';
import { cookies } from 'next/headers';
import UserAccountNav from './UserAccountNav';
import Ticker from './Ticker';

const Navbar = async () => {
  const nextCookies = cookies();
  const user = await getServerSideUser(nextCookies);
  return (
    <>
      <Ticker />
      <div className="bg-white sticky z-50 top-0 inset-x-0 h:16 md:h-24 shadow-sm">
        <header className="relative bg-white">
          <MaxWidthWrapper>
            <div className="flex h-16 md:h-24 items-center justify-between lg:justify-center md:justify-start ">
              <MobileNav user={user} />
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Image
                    src={DorjeLogo}
                    className="h-10 w-10 md:h-16 md:w-16"
                    alt="Dorje Teas Logo"
                  />
                </Link>
              </div>

              <div className="hidden lg:block lg:ml-8 lg:self-stretch">
                <NavItems />
              </div>

              <div className="lg:ml-auto flex items-center">
                <div className="flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <div className="hidden lg:block">
                    {user ? (
                      <UserAccountNav user={user} />
                    ) : (
                      <Link href="/sign-in" className="hidden lg:block">
                        <UserRound className="h-6 w-6 flex-shrink-0 text-gray-400 hover:text-gray-500" />
                      </Link>
                    )}
                  </div>

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </header>
      </div>
    </>
  );
};

export default Navbar;
