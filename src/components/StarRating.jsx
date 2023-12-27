import Image from 'next/image';

const StarRating = ({ rating, totalRatings }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);

  const renderStar = (index) => {
    if (index < fullStars) {
      return (
        <Image
          key={index}
          src="/assets/icons/rating-star.png"
          alt="Full Star"
          width="30"
          height="30"
        />
      );
    } else if (index === fullStars && rating % 1 !== 0) {
      return (
        <Image
          key={index}
          src="/assets/icons/rating-star-half-filled.png"
          alt="Half Star"
          width="30"
          height="30"
        />
      );
    } else {
      return (
        <Image
          key={index}
          src="/assets/icons/rating-star-empty.png"
          alt="Empty Star"
          width="30"
          height="30"
        />
      );
    }
  };

  return (
    <div className="flex items-center gap-1 font-questrial">
      <div className="flex items-center gap-[2px]">
        {[...Array(maxStars)].map((_, index) => renderStar(index))}
      </div>
      <div className="ml-2 mt-1 text-gray-600">({rating.toFixed(1)})</div>
      <div className="ml-2 mt-1 text-gray-600">•</div>
      <div className="ml-2 mt-1 text-gray-600"> {totalRatings} Ratings</div>
    </div>
  );
};

export default StarRating;
