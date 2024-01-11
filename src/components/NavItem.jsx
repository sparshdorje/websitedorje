import React from 'react';
import { Button, buttonVariants } from './ui/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import NavCards from './NavCards';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const NavItem = ({ isAnyOpen, category, handleOpen, close, isOpen }) => {
  return (
    <div
      className="flex cursor-pointer h-full z-20"
      onMouseEnter={handleOpen}
      onMouseLeave={() => close()}
    >
      <div className="relative flex items-center h-full ">
        {category?.dropdown ? (
          <Button
            className={cn(
              '   gap-1.5 h-16  rounded-xl font-questrial hover:bg-[#FFF5EB]',
              {
                'bg-[#FFF5EB] shadow-md': isOpen,
              }
            )}
            variant={'ghost'}
          >
            {category.label}

            <ChevronDown
              className={cn('h-4 w-4 transition-all text-muted-foreground', {
                '-rotate-180': isOpen,
              })}
            />
          </Button>
        ) : (
          <Link
            className={buttonVariants({
              className: 'gap-1.5 h-16  ',
              variant: 'link',
            })}
            href={category?.link ?? ''}
          >
            {category.label}
          </Link>
        )}
      </div>

      {isOpen && category?.dropdown > 0 ? (
        <div
          className={cn(
            'absolute inset-x-0 top-full text-sm text-muted-foreground',
            {
              'animate-in fade-in-10 slide-in-from-top-5': !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />

          <div className="relative bg-[#FFF5EB]">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-16">
                <div className="flex justify-center items-start gap-5">
                  {category?.featured?.map((item) => (
                    <div
                      onClick={() => close()}
                      key={item.name}
                      className="group relative text-base sm:text-sm"
                    >
                      <NavCards item={item} variant={category.cardType} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
