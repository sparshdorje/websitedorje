import RatingService from '@/services/rating';

export async function POST(request) {
  const requestObj = await request.json();

  const { productId, rating, review, email, name } = requestObj || {};

  const reviewResponse = await RatingService.postReview({
    productId,
    rating,
    review,
    email,
    name,
  });

  return Response.json({
    status: reviewResponse.status,
    data: reviewResponse?.data,
  });
}
