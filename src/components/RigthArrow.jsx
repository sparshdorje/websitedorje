import { ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const RigthArrow = ({
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
        swiper?.slideNext();
      }}
      className={cn(
        activeStyles,
        'right-3 z-10 transition',
        {
          [inactiveStyles]: slideConfig.isEnd,
          'hover:bg-primary-300 text-primary-800 bg-opacity-20':
            !slideConfig.isEnd,
        },
        extraStyles
      )}
      aria-label="previous image"
    >
      <ChevronRight className="h-6 w-6 text-white" />
    </button>
  );
};

export default RigthArrow;
