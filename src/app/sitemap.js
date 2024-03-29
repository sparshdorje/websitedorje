import COLLECTIONS from '../config/Collections';
import SHOP_BY_NEED from '../config/ShopByNeed';
import ProductService from '../services/product';
import BlogsService from '../services/blogs';

export default async function sitemap() {
  try {
    const productResponse = await ProductService.getAllProducts();

    const productEntries = productResponse?.data?.data?.products?.edges?.map(
      (product) => {
        return {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.node.handle}`,
          priority: 1,
        };
      }
    );

    const blogsResponse = await BlogsService.getAllBlogs({
      endCursor: null,
      articleSize: 250,
    });

    const blogsEntries =
      blogsResponse?.data?.data?.blogs?.edges?.[0]?.node?.articles?.edges?.map(
        (article) => {
          return {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/posts/${article.node.handle}`,
            priority: 1,
          };
        }
      );

    const collectionEntries = COLLECTIONS.map((collection) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}${collection.href}`,
        priority: 0.9,
      };
    });

    const shopByNeedEntries = SHOP_BY_NEED?.map((collection) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}${collection.href}`,
        priority: 0.9,
      };
    });

    return [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/collections`,
        priority: 0.9,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/experience`,
        priority: 0.9,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/collections/shop-all`,
        priority: 0.9,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop-by-need`,
        priority: 0.9,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`,
        priority: 0.7,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
        priority: 0.7,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/about-us`,
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/make-your-own-blend`,
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/policies/privacy-policy`,
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/policies/refund-policy`,
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/policies/terms-of-service`,
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/policies/shipping-policy`,
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/policies/subscription-policy`,
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/policies/offline-presence`,
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/posts`,
        priority: 0.9,
      },
      ...productEntries,
      ...collectionEntries,
      ...shopByNeedEntries,
      ...blogsEntries,
    ];
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}
