import MakeYourOwnBlendStepper from '@/components/MakeYourOwnBlendStepper';
import ProductService from '@/services/product';
import { cache } from 'react';

const fetchProduct = cache(async (productHandle) => {
  try {
    const response = await ProductService.getProductByHandle({
      productHandle,
    });

    return response.data.data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
});

export async function generateMetadata() {
  const product = await fetchProduct('make-your-blend');
  const { title, description, images } = product || {};

  return {
    title,
    description,
    openGraph: {
      images: [{ url: images?.edges?.[0]?.node?.url }],
      title,
      description,
      url: `https://dorjeteas.com/make-your-own-blend/start`,
      siteName: 'Dorje Teas',
    },
  };
}

const page = async () => {
  const product = await fetchProduct('make-your-blend');

  return (
    <div
      className={
        'pb-0 lg:pb-52 w-full flex flex-col items-center gap-24 min-h-screen'
      }
    >
      <MakeYourOwnBlendStepper product={product} />
    </div>
  );
};

export default page;
