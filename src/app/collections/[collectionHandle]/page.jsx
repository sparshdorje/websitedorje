import CollectionVideo from '@/components/CollectionVideo';
import CollectionBenefitsSlider from '@/components/CollectionBenefitsSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductCard from '@/components/ProductCard';
import COLLECTIONS from '@/config/Collections';
import CollectionService from '@/services/collection';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';
import { ProductCardSkeleton } from '@/components/Skeletons';

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

  let isLoading = true;

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
      isLoading = false;
    }
  };

  const collection = (await getCollection(collectionHandle)) || [];
  const { allProducts = [], bestSellingProducts = [] } =
    (await getProducts()) || {};

  isLoading = false;

  return (
    <div className={'pt-8 pb-52 px-0 w-full grid grid-cols-1 gap-14 lg:gap-16'}>
      {/* COLLECTIONS MOBILE */}
      <MaxWidthWrapper className="flex items-start px-4 lg:items-center overflow-x-scroll justify-start lg:justify-center gap-8">
        {COLLECTIONS.map((collection, idx) => (
          <Link
            href={collection.href}
            key={collection.handle}
            className="flex flex-col items-center gap-2 lg:gap-4"
          >
            <div
              className="relative aspect-square h-20 w-20 lg:h-28 lg:w-28 overflow-hidden rounded-full group-hover:opacity-75"
              style={{
                border:
                  collectionHandle === collection.handle && '2px solid #40733E',
              }}
            >
              <Image
                loading="eager"
                src={collection.imageSrc}
                alt="product category image"
                fill
                className="object-contain object-center"
              />
            </div>
            <div
              className="font-questrial text-center text-xs lg:text-base text-primary font-bold"
              style={{
                color: collectionHandle === collection.handle && '#40733E',
              }}
            >
              {collection.name}
            </div>
          </Link>
        ))}
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
            {!isLoading ? (
              bestSellingProducts?.map((prod) => (
                <ProductCard
                  bestSeller={true}
                  product={prod.node}
                  key={prod.node.id}
                />
              ))
            ) : (
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            )}
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
            {!isLoading ? (
              allProducts?.map((prod) => (
                <ProductCard product={prod.node} key={prod.node.id} />
              ))
            ) : (
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            )}
          </div>
        </MaxWidthWrapper>
      )}
    </div>
  );
};

export default page;
