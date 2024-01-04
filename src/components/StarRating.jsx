import { cn } from '@/lib/utils';
import Image from 'next/image';

const STAR_VARIANT = {
  default: {
    full: '/assets/icons/rating-star.png',
    half: '/assets/icons/rating-star-half-filled.png',
    empty: '/assets/icons/rating-star-empty.png',
  },
  white: {
    full: '/assets/icons/white-star-filled.png',
    half: '/assets/icons/white-star-half-filled.png',
    empty: '/assets/icons/white-star-empty.png',
  },
};

const StarRating = ({
  rating,
  totalRatings,
  showTotalRating = true,
  variant = 'default',
  size = '30',
  className,
}) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);

  const renderStar = (index) => {
    if (index < fullStars) {
      return (
        <Image
          key={index}
          src={STAR_VARIANT[variant].full}
          alt="Full Star"
          width={size}
          height={size}
        />
      );
    } else if (index === fullStars && rating % 1 !== 0) {
      return (
        <Image
          key={index}
          src={STAR_VARIANT[variant].half}
          alt="Half Star"
          width={size}
          height={size}
        />
      );
    } else {
      return (
        <Image
          key={index}
          src={STAR_VARIANT[variant].empty}
          alt="Empty Star"
          width={size}
          height={size}
        />
      );
    }
  };

  return (
    <div className="flex items-center gap-1 font-questrial">
      <div className="flex items-center gap-[2px]">
        {[...Array(maxStars)].map((_, index) => renderStar(index))}
      </div>
      <div className={cn('ml-2 mt-1 text-gray-600', className)}>
        ({rating.toFixed(1)})
      </div>
      {showTotalRating && (
        <>
          <div className={cn('ml-2 mt-1 text-gray-600', className)}>•</div>
          <div className={cn('ml-2 mt-1 text-gray-600', className)}>
            {' '}
            {totalRatings} Ratings
          </div>
        </>
      )}
    </div>
  );
};

export default StarRating;
