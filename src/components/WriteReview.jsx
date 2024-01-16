'use client';

import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

const WriteReview = ({ productId, user = {} }) => {
  const { displayName: userName, email: userEmail } = user;
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  const router = useRouter();

  const sendReview = async () => {
    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        body: JSON.stringify({
          productId,
          rating,
          review: reviewContent,
          name: name || userName,
          email: email || userEmail,
        }),
      });

      const responseData = await response.json();

      if (responseData.status === 201) {
        toast.success('Thanks for your review!');
        resetForm();

        router.refresh();
      } else {
        toast.error('Something went wrong');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const resetForm = () => {
    setRating(0);
    setReviewContent('');
    setName('');
    setEmail('');
    setIsButtonDisabled(true);
    setIsReviewVisible(false);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    updateButtonDisabledState();
  };

  const updateButtonDisabledState = () => {
    setIsButtonDisabled(
      rating === 0 ||
        reviewContent.trim() === '' ||
        name?.trim() === '' ||
        userName?.trim() === '' ||
        email?.trim() === '' ||
        userEmail?.trim() === ''
    );
  };

  const handleWriteReviewClick = () => {
    setIsReviewVisible(true);
  };

  const handleReviewContentChange = (event) => {
    const content = event.target.value;
    setReviewContent(content);
    updateButtonDisabledState();
  };
  const handleNameChange = (event) => {
    const userName = event.target.value;
    setName(userName);
    updateButtonDisabledState();
  };
  const handleEmailChange = (event) => {
    const userEmail = event.target.value;
    setEmail(userEmail);
    updateButtonDisabledState();
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          className="text-2xl"
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
            <div className="font-questrial text-lg font-semibold text-primary">
              Your Rating
            </div>
            <div className="flex items-center gap-3">{renderStars()}</div>
          </div>

          {!user ||
            (Object.keys(user).length === 0 && (
              <div className="flex items-start gap-2 w-full">
                <div className="flex-1">
                  <div className="font-questrial text-lg font-semibold text-primary">
                    Name
                  </div>
                  <Input
                    type="text"
                    className="bg-white"
                    onChange={handleNameChange}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-questrial text-lg font-semibold text-primary">
                    Email
                  </div>
                  <Input
                    type="email"
                    className="bg-white"
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            ))}

          <div className="flex flex-col items-start  gap-2 w-full">
            <div className="font-questrial text-lg font-semibold text-primary">
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
