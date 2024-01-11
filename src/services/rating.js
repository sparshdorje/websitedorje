import { judgeMeInstance } from './ShopifyService';
import { extractRatings, extractReviewsInfo } from '@/lib/utils';

const RatingService = {
  getAverageRating: async (productId) => {
    const response = await judgeMeInstance.get(
      `widgets/preview_badge?external_id=${productId}&page=1&per_page=20&api_token=bpV91llnywtnrfAytVgThOndTEI`
    );

    const ratingData = response?.data?.badge || '';

    return extractRatings(ratingData);
  },
  getProductReview: async (productId) => {
    const response = await judgeMeInstance.get(
      `/widgets/product_review?external_id=${productId}&page=1&per_page=5`
    );

    const reviewData = response?.data?.widget || '';

    return extractReviewsInfo(reviewData);
  },
};

export default RatingService;
