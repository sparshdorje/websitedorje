import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import UserService from '@/services/user';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price, options = {}) {
  const { currency = 'INR', notation = 'compact' } = options;

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
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
