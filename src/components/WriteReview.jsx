'use client';

import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const WriteReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  const router = useRouter();

  const sendReview = async () => {
    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        body: JSON.stringify({ productId, rating, review: reviewContent }),
      });

      const responseData = await response.json();

      if (responseData.status === 201) {
        toast.success('Thanks for your review!');
        // Clear the fields
        setRating(0);
        setReviewContent('');
        setIsButtonDisabled(true);
        setIsReviewVisible(false);

        router.refresh();
      } else {
        toast.error('Something went wrong');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setIsButtonDisabled(newRating === 0 || reviewContent.trim() === '');
  };

  const handleReviewContentChange = (event) => {
    const content = event.target.value;
    setReviewContent(content);
    setIsButtonDisabled(rating === 0 || content.trim() === '');
  };

  const handleWriteReviewClick = () => {
    setIsReviewVisible(true);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          className="text-xl"
          style={{ cursor: 'pointer', color: i <= rating ? '#14222B' : 'gray' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="w-full flex justify-center">
      {isReviewVisible ? (
        <div className="flex flex-col items-center w-full gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="font-fraunces text-lg font-semibold text-primary">
              Rating
            </div>
            <div className="flex items-center gap-3">{renderStars()}</div>
          </div>

          <div className="flex flex-col items-center  gap-4 w-full">
            <div className="font-fraunces text-lg font-semibold text-primary">
              Write a Review
            </div>
            <Textarea
              value={reviewContent}
              onChange={handleReviewContentChange}
              placeholder="Write your review..."
              className="bg-white w-full"
            />
          </div>

          <Button
            className={'rounded-full w-full'}
            onClick={sendReview}
            disabled={isButtonDisabled}
          >
            Post review
          </Button>
        </div>
      ) : (
        <Button className={'rounded-full'} onClick={handleWriteReviewClick}>
          Write a review
        </Button>
      )}
    </div>
  );
};

export default WriteReview;
