import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import UserService from '@/services/user';
import { parse } from 'node-html-parser';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price, options = {}) {
  const { currency = 'INR', notation = 'compact' } = options;

  const numericPrice = typeof price === 'string' ? price : price;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

export function truncate(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + '...'; // Appending ellipsis after maxLength characters
  }
}

export const setCookie = ({ name, value, expiresAt }) => {
  const expires = `expires=${expiresAt}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getServerSideUser = async (cookies) => {
  const token = cookies.get('access_token')?.value;

  try {
    const userResponse = await UserService.getUserDetail(token);
    const userData = userResponse?.data?.data?.customer;
    return userData;
  } catch (error) {
    console.error('Error fetching User:', error);
  }
};

export function extractProductId(shopifyProductURI) {
  const regex = /\/(\d+)$/;
  const match = regex.exec(shopifyProductURI);
  return (match && match[1]) || '7944972665057';
}

export function extractRatings(ratingData) {
  const regexForRatingAndReviews =
    /data-average-rating='([\d.]+)' data-number-of-reviews='(\d+)'/;
  const matchRatingAndReview = regexForRatingAndReviews.exec(ratingData);

  const averageRating =
    (matchRatingAndReview && parseFloat(matchRatingAndReview[1])) || 0;
  const totalRatings =
    (matchRatingAndReview && parseInt(matchRatingAndReview[2])) || 0;

  return { averageRating, totalRatings };
}

export function extractReviewsInfo(html) {
  const root = parse(html);
  const reviews = [];

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  for (const reviewDiv of root.querySelectorAll('.jdgm-rev')) {
    const review = {};

    // Extract reviewer name
    const reviewerName = reviewDiv.querySelector('.jdgm-rev__author');
    review.reviewerName = reviewerName ? reviewerName.text.trim() : 'N/A';

    // Extract review content
    const reviewContent = reviewDiv.querySelector('.jdgm-rev__body');
    review.reviewContent = reviewContent ? reviewContent.text.trim() : 'N/A';

    // Extract rating
    const rating = reviewDiv.querySelector('.jdgm-rev__rating');
    review.rating = rating
      ? parseInt(rating.getAttribute('data-score'))
      : 'N/A';

    // Extract timestamp
    const timestamp = reviewDiv.querySelector('.jdgm-rev__timestamp');
    review.timestamp = timestamp
      ? formatDate(timestamp.getAttribute('data-content'))
      : 'N/A';

    reviews.push(review);
  }

  return reviews;
}

export const isMobileDevice = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export function formatDateString(inputDateString) {
  const date = new Date(inputDateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
