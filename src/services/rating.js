import { judgeMeInstance } from './ShopifyService';
import { extractRatings, extractReviewsInfo } from '@/lib/utils';

const RatingService = {
  getAverageRating: async (productId) => {
    const response = await judgeMeInstance.get(
      `widgets/preview_badge?external_id=${productId}&api_token=bpV91llnywtnrfAytVgThOndTEI`,
      {
        params: {
          info: 'PUBLIC',
        },
      }
    );

    const ratingData = response?.data?.badge || '';

    return extractRatings(ratingData);
  },
  getProductReview: async (productId) => {
    const response = await judgeMeInstance.get(
      `/widgets/product_review?external_id=${productId}&page=1&per_page=10`
    );

    const reviewData = response?.data?.widget || '';

    return extractReviewsInfo(reviewData);
  },
  postReview: async ({ productId, rating, review, email, name }) => {
    const response = await judgeMeInstance.post(`/reviews`, {
      shop_domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
      platform: 'shopify',
      id: productId,
      email,
      name,
      reviewer_name_format: '',
      rating,
      title: review,
      body: review,
    });

    return response;
  },
};

export default RatingService;
