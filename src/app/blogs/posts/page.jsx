import React, { cache } from 'react';
import BlogsService from '../../../services/blogs';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import BlogCard from '@/components/BlogCard';
import BlogsNavigationButtons from '@/components/BlogsNavigationButtons';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { ASSETS } from '@/config';

const fetchBlogs = cache(async ({ endCursor = null }) => {
  try {
    const response = await BlogsService.getAllBlogs({ endCursor });
    return response?.data?.data?.blogs?.edges?.[0]?.node?.articles;
  } catch (error) {
    console.error('Error fetching Blogs:', error);
  }
});

export async function generateMetadata() {
  return {
    title: 'Posts',
    description:
      'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
    openGraph: {
      title: 'Posts',
      description:
        'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
      url: `https://dorjeteas.com/blogs/posts`,
      siteName: 'Dorje Teas',
      images: [
        {
          url: `${ASSETS.ICONS}/dorje-logo.png`, // Must be an absolute URL
        },
      ],
    },
  };
}

const page = async ({ params, searchParams }) => {
  const { endCursor } = searchParams;
  const blogsResponse = await fetchBlogs({ endCursor });
  const { edges: blogs, pageInfo } = blogsResponse || {};
  const { hasNextPage, endCursor: nextEndCursor } = pageInfo || {};

  const featuredBlog = blogs.slice(0, 1);
  const otherBlogs = blogs.slice(1);

  return (
    <MaxWidthWrapper
      className={
        'mx-auto pt-8 pb-20 w-full grid grid-cols-1 gap-10 lg:gap-20 max-w-screen-xl'
      }
    >
      <Link
        href={`/blogs/posts/${featuredBlog?.[0]?.node?.handle}`}
        className="flex flex-col lg:flex-row lg:justify-between w-full lg:h-[500px] gap-4 lg:gap-6"
      >
        <div className="w-full h-[250px] lg:w-[70%] lg:h-full rounded-lg overflow-hidden">
          <Image
            src={featuredBlog?.[0]?.node?.image?.url}
            width={900}
            height={900}
            className="w-full h-full object-cover"
            loading="eager"
            alt="blog image"
          />
        </div>
        <div className="w-full lg:w-[30%] lg:h-full flex flex-col items-start justify-between">
          <div>
            <div className="font-inter font-medium text-primary text-xl lg:text-3xl mb-4">
              {featuredBlog?.[0]?.node?.title}
            </div>

            <div className="font-inter text-primary text-base lg:text-lg">
              {featuredBlog?.[0]?.node?.excerpt}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="font-inter text-primary text-base mb-1">
              Written by {featuredBlog?.[0]?.node?.authorV2?.name}
            </div>
            <div className="font-inter  text-xs text-gray-600">
              Published On:{' '}
              {moment(featuredBlog?.[0]?.node?.publishedAt).format(
                'MMM DD YYYY'
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-wrap gap-10 justify-between items-center">
        {otherBlogs?.map((blog) => (
          <BlogCard blog={blog} key={blog?.node?.handle} />
        ))}
      </div>
      <BlogsNavigationButtons
        hasNextPage={hasNextPage}
        nextEndCursor={nextEndCursor}
        endCursor={endCursor}
      />
    </MaxWidthWrapper>
  );
};

export default page;
