import ProductService from '@/services/product';
import MakeYourOwnBlendStepper from '@/components/MakeYourOwnBlendStepper';
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
