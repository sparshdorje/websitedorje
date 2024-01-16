'use client';

import ReviewCard from '../components/ReviewCard';

import RatingService from '@/services/rating';
import { useState } from 'react';
import { Button } from './ui/button';

const ReviewsDisplay = ({ reviewData = [], productId, totalReviews }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [moreReviews, setMoreReviews] = useState([]);

  const totalPages = Math.ceil(totalReviews / 10);

  const fetchReviewData = async () => {
    try {
      setIsLoading(true);
      const response = await RatingService.getProductReview({
        productId,
        pageNumber,
      });
      setIsLoading(false);
      setMoreReviews((prevReviews) => {
        return [...prevReviews, ...response];
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        {reviewData?.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
        {moreReviews?.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
      </div>

      {pageNumber <= totalPages && (
        <Button
          variant="outline"
          className="border-secondary text-secondary rounded-full w-full"
          onClick={() => {
            setPageNumber(pageNumber + 1);
            fetchReviewData();
          }}
        >
          {isLoading ? 'Loading More Reviews...' : 'Load More Reviews'}
        </Button>
      )}
    </div>
  );
};

export default ReviewsDisplay;
