import { BadgeCheck, CircleUserRound } from 'lucide-react';
import React from 'react';

const ReviewCard = ({ review }) => {
  const { reviewerName, reviewContent, rating, timestamp } = review || {};
  return (
    <div className="w-full border-b py-6 border-gray-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 font-questrial">
          <div className="p-1 rounded-full flex items-center justify-center bg-[#DECEC0]">
            <CircleUserRound color="#847466" />
          </div>
          <div>{reviewerName}</div>
          <div>
            <BadgeCheck className="text-secondary-dark" />
          </div>
        </div>
        <div className="font-questrial text-gray-500">{timestamp}</div>
      </div>
      <div className="font-questrial text-gray-600">{reviewContent}</div>
    </div>
  );
};

export default ReviewCard;
