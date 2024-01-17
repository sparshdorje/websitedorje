'use client';
import { motion } from 'framer-motion';
import { BadgeCheck, CircleUserRound } from 'lucide-react';
import StarRating from './StarRating';

const ReviewCard = ({ review }) => {
  const { reviewerName, reviewContent, rating, timestamp } = review || {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="w-full border-b py-6 border-gray-300"
    >
      <div className="mb-4 flex flex-col items-start gap-2 w-full">
        <div className="flex items-center justify-between w-full">
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
        <StarRating rating={rating} showTotalRating={false} size="20" />
      </div>
      <div className="font-questrial text-gray-600">{reviewContent}</div>
    </motion.div>
  );
};

export default ReviewCard;
