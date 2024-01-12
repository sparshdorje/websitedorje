import ProductService from '../services/product';
import COLLECTIONS from '../config/Collections';

export default async function sitemap() {
  try {
    const response = await ProductService.getAllProducts();

    const productEntries = response?.data?.data?.products?.edges?.map(
      (product) => {
        return {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.node.handle}`,
          priority: 1,
        };
      }
    );

    const collectionEntries = COLLECTIONS.map((collection) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}${collection.href}`,
        priority: 0.8,
      };
    });

    return [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/collections`,
        priority: 0.8,
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
      ...productEntries,
      ...collectionEntries,
    ];
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}
