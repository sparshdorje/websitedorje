'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { useState } from 'react';
import NavItem from './NavItem';
import { ScrollArea } from './ui/scroll-area';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const isAnyOpen = activeIndex !== null;

  return (
    <div className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const close = () => setActiveIndex(null);

        const isOpen = i === activeIndex;

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
            close={close}
            key={category.value}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
