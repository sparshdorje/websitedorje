import { getServerSideUser } from '@/lib/utils';
import RatingService from '@/services/rating';
import { cookies } from 'next/headers';

export async function POST(request) {
  const nextCookies = cookies();
  const user = await getServerSideUser(nextCookies);
  const requestObj = await request.json();

  const { productId, rating, review } = requestObj || {};
  const { email, name } = user || {};

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
