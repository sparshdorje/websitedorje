'use client';
import { truncate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/blogs/posts/${blog?.node?.handle}`}
        className="flex flex-col items-start w-full lg:w-[350px] lg:h-[500px] gap-3"
      >
        <div className="rounded-lg h-[280px] w-full overflow-hidden shadow-md">
          <Image
            alt="Blog Image"
            width={600}
            height={600}
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
    </motion.div>
  );
};

export default BlogCard;
