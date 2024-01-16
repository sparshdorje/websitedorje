import { extractProductId } from '@/lib/utils';
import RatingService from '@/services/rating';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import StarRating from './StarRating';

const RELATED_CARD_VARIANT = {
  titleStyles: {
    default: 'text-left font-fraunces font-semibold text-base text-white',
    dark: 'text-left font-fraunces font-semibold text-base text-primary',
  },
  ratingStarColor: {
    default: 'white',
    dark: 'default',
  },
  ratingStarTextColor: {
    default: 'text-white opacity-60 text-xs',
    dark: 'text-primary',
  },
};

const RelatedProductCard = ({ product, variant = 'default' }) => {
  const [ratingData, setRatingData] = useState({});
  const productId = extractProductId(product.id);

  const fetchRatingData = async (productId) => {
    try {
      const response = await RatingService.getAverageRating(productId);
      setRatingData(response);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchRatingData(productId);
  }, []);

  const imageUrl = product?.images?.edges?.[0]?.node?.url;
  return (
    <Link
      href={`/products/${product.handle}`}
      className={`flex flex-col gap-1 items-start pb-2 min-w-[200px] w-[200px]`}
    >
      <div className="w-full h-[200px] mb-1 rounded-xl overflow-hidden">
        <Image
          alt="product image"
          loading="eager"
          src={imageUrl}
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
      </div>
      <div className={RELATED_CARD_VARIANT.titleStyles[variant]}>
        {product.title}
      </div>
      <StarRating
        rating={ratingData.averageRating}
        totalRatings={ratingData.totalRatings}
        showTotalRating={false}
        variant={RELATED_CARD_VARIANT.ratingStarColor[variant]}
        size="20"
        className={RELATED_CARD_VARIANT.ratingStarTextColor[variant]}
      />
    </Link>
  );
};

export default RelatedProductCard;
