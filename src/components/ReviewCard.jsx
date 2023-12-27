import { BadgeCheck, CircleUserRound } from 'lucide-react';
import React from 'react';

const ReviewCard = () => {
  return (
    <div className="w-full border-b pb-6 border-gray-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 font-questrial">
          <div className="p-1 rounded-full flex items-center justify-center bg-[#DECEC0]">
            <CircleUserRound color="#847466" />
          </div>
          <div>Aditya Das</div>
          <div>
            <BadgeCheck className="text-secondary-dark" />
          </div>
        </div>
        <div className="font-questrial text-gray-500">06/12/2023</div>
      </div>
      <div className="font-questrial text-gray-600">
        Darjeeling tea is a revelation! Delicate, floral notes transport me to
        the misty Himalayan slopes. A truly elegant brew that's a daily
        indulgence. #TeaEnthusiast
      </div>
    </div>
  );
};

export default ReviewCard;
