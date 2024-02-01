'use client';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BlogsNavigationButtons = ({ endCursor, hasNextPage, nextEndCursor }) => {
  const router = useRouter();
  return (
    <div className="flex items-center w-full gap-4 justify-center mt-4">
      <Button
        onClick={() => router.back()}
        variant="secondary"
        className="w-[120px] bg-transparent border-primary hover:bg-transparent border-2"
        disabled={!endCursor}
      >
        Previous Page
      </Button>

      {hasNextPage && (
        <Link href={`?endCursor=${nextEndCursor}`}>
          <Button className="w-[120px]">Next Page</Button>
        </Link>
      )}
    </div>
  );
};

export default BlogsNavigationButtons;
