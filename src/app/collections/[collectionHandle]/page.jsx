import CollectionBenefitsSlider from '@/components/CollectionBenefitsSlider';
import CollectionsBox from '@/components/CollectionsBox';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductCard from '@/components/ProductCard';
import CollectionService from '@/services/collection';
import Image from 'next/image';
import { cache } from 'react';

const getCollection = cache(async (handle) => {
  const fetchedProducts = await CollectionService.getCollectionByHandle({
    handle,
  });
  const collection = fetchedProducts?.data?.data?.collection;

  return collection;
});

// export async function generateStaticParams() {
//   return COLLECTIONS.map((collection) => {
//     return collection.handle;
//   });
// }

export async function generateMetadata({ params: { collectionHandle } }) {
  const collection = await getCollection(collectionHandle);
  const { title, description } = collection || {};

  return {
    title,
    description,
  };
}

const page = async ({ params }) => {
  const { collectionHandle } = params;

  const getProducts = async () => {
    try {
      const fetchedProducts = await CollectionService.getProductsInCollection({
        handle: collectionHandle,
      });
      const bestSellingProductsData =
        fetchedProducts?.data?.data?.collection?.products?.edges?.slice(0, 4);
      const allProductsData =
        fetchedProducts?.data?.data?.collection?.products?.edges?.slice(4);

      return {
        allProducts: allProductsData,
        bestSellingProducts: bestSellingProductsData,
      };
    } catch (e) {
      console.log(e);
    }
  };

  const collection = (await getCollection(collectionHandle)) || [];
  const { allProducts = [], bestSellingProducts = [] } =
    (await getProducts()) || {};

  return (
    <div className={'pt-8 pb-52 px-0 w-full grid grid-cols-1 gap-14 lg:gap-16'}>
      {/* COLLECTIONS MOBILE */}
      <MaxWidthWrapper className={'px-0'}>
        <CollectionsBox
          collectionHandle={collectionHandle}
          showTransition={false}
        />
      </MaxWidthWrapper>

      {/* BANNER */}

      <MaxWidthWrapper className={'max-w-screen-xl '}>
        <div className="w-full h-[216px] rounded-lg lg:h-[600px] bg-white overflow-hidden">
          <Image
            loading="lazy"
            height={600}
            width={600}
            className="h-full w-full object-cover"
            src={
              collection?.image?.url
                ? collection?.image?.url
                : '/assets/banners/collection-fallback.png'
            }
            alt="Collection Banner"
          />
        </div>
      </MaxWidthWrapper>

      {/* BEST SELLERS */}
      {bestSellingProducts.length > 0 && (
        <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
          <div className="px-4 lg:px-0 font-fraunces font-semibold text-xl mb-4 text-primary">
            {collection.title} Bestsellers
          </div>
          <div className="px-4 lg:px-0 flex lg:grid grid-cols-1 overflow-x-scroll py-2 lg:grid-cols-4 gap-5">
            {bestSellingProducts?.map((prod) => (
              <ProductCard
                bestSeller={true}
                product={prod.node}
                key={prod.node.id}
              />
            ))}
          </div>
        </MaxWidthWrapper>
      )}

      {/* BENEFITS */}
      <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
        <div className="px-4 lg:px-0 font-fraunces font-semibold text-xl mb-4 text-primary">
          Benefits of {collection.title}
        </div>
        <div className="w-full h-[200px] lg:h-[750px]">
          <CollectionBenefitsSlider collectionHandle={collectionHandle} />
        </div>
      </MaxWidthWrapper>

      {/* TASTE */}
      {/* <MaxWidthWrapper className="max-w-screen-xl px-4">
        <div className="font-fraunces font-semibold text-xl mb-4 text-primary">
          Taste of {collection.title}
        </div>
        <div className="w-full rounded-2xl h-[216px] lg:h-[600px] bg-white overflow-hidden">
          <CollectionVideo />
        </div>
      </MaxWidthWrapper> */}

      {/* ALL PRODUCTS */}

      {allProducts.length > 0 && (
        <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
          <div className="px-4 lg:px-0 font-fraunces font-semibold text-xl mb-4 text-primary">
            All {collection.title} Products
          </div>
          <div className="px-4 lg:px-0 flex grid-cols-4 overflow-x-scroll lg:grid gap-5 py-2">
            {allProducts?.map((prod) => (
              <ProductCard product={prod.node} key={prod.node.id} />
            ))}
          </div>
        </MaxWidthWrapper>
      )}
    </div>
  );
};

export default page;
