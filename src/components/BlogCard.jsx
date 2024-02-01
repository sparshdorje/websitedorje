import { truncate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <Link
      href={`/blogs/posts/${blog?.node?.handle}`}
      className="flex flex-col items-start w-full lg:w-[350px] lg:h-[500px] gap-3"
    >
      <div className="rounded-lg h-[280px] w-full overflow-hidden shadow-md">
        <Image
          alt="Blog Image"
          width={200}
          height={200}
          className="w-full h-full object-cover "
          src={blog?.node?.image?.url}
          loading="eager"
        />
      </div>

      <div className="font-inter font-medium text-primary text-xl">
        {truncate(blog?.node?.title, 60)}
      </div>

      <div className="font-inter text-primary text-base">
        {truncate(blog?.node?.excerpt, 180)}
      </div>
    </Link>
  );
};

export default BlogCard;
