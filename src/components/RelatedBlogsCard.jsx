import { truncate } from '@/lib/utils';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RelatedBlogsCard = ({ blog }) => {
  return (
    <Link
      href={`/blogs/posts/${blog?.node?.handle}`}
      className="flex flex-col lg:flex-row items-start w-full gap-6 h-[500px] lg:h-[200px]"
    >
      <div className="rounded-lg w-full h-[300px] lg:h-[200px] lg:w-[300px] overflow-hidden shadow-md">
        <Image
          alt="Blog Image"
          width={600}
          height={600}
          className="w-full h-full object-cover "
          src={blog?.node?.image?.url}
          loading="eager"
        />
      </div>

      <div className="w-full lg:w-[500px] flex flex-col justify-start gap-4 lg:gap-6">
        <div>
          <div className="font-inter text-gray-600 text-xs mb-2">
            Published At: {moment(blog.publishedAt).format('MMM DD YYYY')}
          </div>

          <div className="font-inter font-medium text-primary text-xl">
            {truncate(blog?.node?.title, 60)}
          </div>
        </div>

        <div className="font-inter text-primary text-base">
          {truncate(blog?.node?.excerpt, 180)}
        </div>
      </div>
    </Link>
  );
};

export default RelatedBlogsCard;
