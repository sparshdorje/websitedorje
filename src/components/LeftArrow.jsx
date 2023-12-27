import React from 'react';
import { cn } from '../lib/utils';
import { ChevronLeft } from 'lucide-react';

const LeftArrow = ({
  swiper,
  slideConfig,
  activeStyles,
  inactiveStyles,
  extraStyles,
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        swiper?.slidePrev();
      }}
      className={cn(
        activeStyles,
        'left-3 z-10  transition',
        {
          [inactiveStyles]: slideConfig.isBeginning,
          'hover:bg-primary-300 text-primary-800 bg-opacity-20':
            !slideConfig.isBeginning,
        },
        extraStyles
      )}
      aria-label="previous image"
    >
      <ChevronLeft className="h-6 w-6 text-white" />
    </button>
  );
};

export default LeftArrow;
