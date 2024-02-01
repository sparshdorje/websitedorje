import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import RelatedBlogsCard from '@/components/RelatedBlogsCard';
import { Separator } from '@/components/ui/separator';
import moment from 'moment';
import Image from 'next/image';
import { cache } from 'react';
import BlogsService from '../../../../services/blogs';

const fetchBlogByHandle = cache(async (blogHandle) => {
  try {
    const response = await BlogsService.getBlogsByHandle({
      handle: blogHandle,
    });
    return {
      blog: response?.data?.data?.blogs?.edges?.[0]?.node?.articleByHandle,
      cursor: response?.data?.data?.blogs?.pageInfo?.endCursor,
    };
  } catch (error) {
    console.error('Error fetching Blog:', error);
  }
});

const fetchRelatedBlogs = async (cursor, currentBlogPublishTime) => {
  try {
    const response = await BlogsService.getRelatedBlogs({
      cursor,
      currentBlogPublishTime,
    });
    return response?.data?.data?.blogs?.edges?.[0]?.node?.articles?.edges;
  } catch (error) {
    console.error('Error fetching Blog:', error);
  }
};

export async function generateMetadata({ params: { blogHandle } }) {
  const { blog } = await fetchBlogByHandle(blogHandle);
  const { title, excerpt, image } = blog || {};

  return {
    title,
    description: excerpt,
    openGraph: {
      images: [{ url: image?.url }],
      title,
      description: excerpt,
      url: `https://dorjeteas.com/blogs/posts/${blogHandle}`,
      siteName: 'Dorje Teas',
    },
  };
}

const page = async ({ params }) => {
  const { blogHandle } = params;

  const { blog, cursor } = await fetchBlogByHandle(blogHandle);
  const relatedBlogs = await fetchRelatedBlogs(cursor, blog.publishedAt);

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

        <Separator />

        <div className="font-inter text-lg text-primary mb-4">
          Here are some related articles you may find interesting
        </div>

        <div className="flex flex-col items-start gap-12">
          {relatedBlogs?.map((blog) => (
            <RelatedBlogsCard blog={blog} key={blog?.node?.handle} />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
