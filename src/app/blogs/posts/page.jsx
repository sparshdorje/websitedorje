import React, { cache } from 'react';
import BlogsService from '../../../services/blogs';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const fetchBlogs = cache(async ({ endCursor = null }) => {
  try {
    const response = await BlogsService.getAllBlogs({ endCursor });
    return response?.data?.data?.blogs?.edges?.[0]?.node?.articles;
  } catch (error) {
    console.error('Error fetching Blogs:', error);
  }
});

const page = async ({ params, searchParams }) => {
  const { endCursor } = searchParams;
  const blogsResponse = await fetchBlogs({ endCursor });
  const { edges: blogs, pageInfo } = blogsResponse || {};
  const { hasNextPage, endCursor: nextEndCursor } = pageInfo || {};

  console.log(blogs);

  return (
    <MaxWidthWrapper
      className={'mx-auto pt-8 pb-20 w-full grid grid-cols-1 gap-12 lg:gap-20'}
    >
      <div className="grid grid-cols-3">
        {blogs?.map((blog) => (
          <BlogCard blog={blog} />
        ))}
      </div>

      {endCursor && <Button variant="outline">Back</Button>}
      {hasNextPage && (
        <Link href={`?endCursor=${nextEndCursor}`}>
          <Button>Next</Button>
        </Link>
      )}
    </MaxWidthWrapper>
  );
};

export default page;
