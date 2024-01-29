import { extractProductId } from '@/lib/utils';
import RatingService from '@/services/rating';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import AddToCartButton from './AddToCartButton';

const PeopleAlsoBoughtCard = ({
  product,
  setIsSheetOpen,
  sheetKey,
  setSheetKey,
}) => {
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
    <div
      className={`flex flex-col gap-1 items-start justify-between pb-2 min-w-[220px] w-[220px] h-[350px] p-3 rounded-xl bg-white`}
    >
      <Link
        href={`/products/${product.handle}`}
        className="flex flex-col items-start gap-1"
        onClick={() => {
          setIsSheetOpen(false);
          setSheetKey(sheetKey + 1);
        }}
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

        <div
          className={
            'text-left font-fraunces font-semibold text-sm text-primary'
          }
        >
          {product.title}
        </div>

        <StarRating
          rating={ratingData.averageRating}
          totalRatings={ratingData.totalRatings}
          showTotalRating={false}
          variant={'default'}
          size="15"
          className={'text-primary text-sm'}
        />
      </Link>
      <div className="py-2 w-full">
        <AddToCartButton
          product={product?.variants?.edges?.[0]?.node}
          quantity={1}
          extraClasses={'py-2 w-full text-white rounded-3xl text-sm lg:text-sm'}
          variant="default"
          isCart={true}
        />
      </div>
    </div>
  );
};

export default PeopleAlsoBoughtCard;
