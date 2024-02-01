import React, { cache } from 'react';
import BlogsService from '../../../../services/blogs';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import { formatDateString } from '@/lib/utils';
import moment from 'moment';
import { Separator } from '@/components/ui/separator';

const fetchBlogByHandle = cache(async (blogHandle) => {
  try {
    const response = await BlogsService.getBlogsByHandle({
      handle: blogHandle,
    });

    console.log(
      response?.data?.data?.blogs?.edges?.[0]?.node?.articleByHandle,
      'blogs'
    );
    return response?.data?.data?.blogs?.edges?.[0]?.node?.articleByHandle;
  } catch (error) {
    console.error('Error fetching Blog:', error);
  }
});

const page = async ({ params }) => {
  const { blogHandle } = params;

  const blog = await fetchBlogByHandle(blogHandle);

  return (
    <div className="w-full h-full bg-white">
      <MaxWidthWrapper
        className={
          'mx-auto pt-8 pb-20 w-full grid grid-cols-1 gap-6 lg:gap-8 max-w-screen-lg'
        }
      >
        <div className="font-Inter font-medium text-primary text-2xl lg:text-4xl">
          {blog.title}
        </div>

        <div className="mb-4 lg:mb-8">
          <div className="font-questrial font-medium text-primary text-sm lg:text-lg mb-4">
            Written by {blog.authorV2.name} | Published On:{' '}
            {moment(blog.publishedAt).format('MMM DD YYYY')}
          </div>
          <div className="w-full h-[250px] lg:h-[700px] aspect-video bg-black rounded-lg overflow-hidden">
            <Image
              src={blog?.image?.url}
              width={1000}
              height={1000}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: `${blog.contentHtml}` }}
          className="font-inter text-lg blog-content"
        ></div>
        {/* <div>{JSON.stringify(blog)}</div> */}

        <Separator />

        <div className="font-inter text-lg text-primary">
          Here are some related articles you may find interesting
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
