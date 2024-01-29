import React, { cache } from 'react';
import BlogsService from '../../../../services/blogs';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import { formatDateString } from '@/lib/utils';
import moment from 'moment';

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
    <MaxWidthWrapper
      className={'mx-auto pt-8 pb-20 w-full grid grid-cols-1 gap-12 lg:gap-20'}
    >
      <div className="font-fraunces font-medium text-primary text-4xl">
        {blog.title}
      </div>

      <div>
        <div className="font-questrial font-medium text-primary text-lg mb-4">
          Written by {blog.authorV2.name} | Published On:{' '}
          {moment(blog.publishedAt).format('MMM DD YYYY')}
        </div>
        <div className="w-full h-[900px] aspect-video bg-black rounded-lg overflow-hidden">
          <Image
            src={blog?.image?.url}
            width={1000}
            height={1000}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: `${blog.contentHtml}` }}></div>
      {/* <div>{JSON.stringify(blog)}</div> */}
    </MaxWidthWrapper>
  );
};

export default page;
