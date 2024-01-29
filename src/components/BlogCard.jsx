import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <Link
      href={`/blogs/posts/${blog?.node?.handle}`}
      className="flex flex-col items-start min-w-[300px] w-[300px] h-[480px] gap-3"
    >
      <div className="rounded-lg h-[280px] w-full overflow-hidden">
        <Image
          alt="Blog Image"
          width={200}
          height={200}
          className="w-full h-full object-cover "
          src={blog?.node?.image?.url}
        />
      </div>

      <div className="font-fraunces font-medium text-primary text-xl">
        {blog?.node?.title}
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: `${blog?.node?.excerptHtml}` }}
        className="font-questrial font-medium text-primary text-sm"
      ></div>
    </Link>
  );
};

export default BlogCard;
