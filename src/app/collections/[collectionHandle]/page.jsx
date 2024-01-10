import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import BenefitsSlider from '@/components/BenefitsSlider';
import ProductCard from '@/components/ProductCard';
import CollectionVideo from '@/components/CollectionVideo';
import { COLLECTIONS } from '@/config';
import CollectionService from '@/services/collection';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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
  };

  const collection = (await getCollection(collectionHandle)) || [];
  const { allProducts = [], bestSellingProducts = [] } =
    (await getProducts()) || {};

  return (
    <MaxWidthWrapper
      className={
        'pt-8 pb-52 px-4 w-full max-w-screen-xl grid grid-cols-1 gap-16 lg:gap-24'
      }
    >
      <Head>
        <title>Dorje Teas | Products</title>
        <meta property="og:title" content="Dorje Teas | Products" key="title" />
      </Head>

      {/* COLLECTIONS MOBILE */}
      <div className="lg:hidden flex items-start overflow-x-scroll justify-start gap-8 pb-2">
        {COLLECTIONS.map((collection, idx) => (
          <Link
            href={collection.href}
            key={collection.handle}
            className="flex flex-col items-center gap-4"
          >
            <div
              className="relative aspect-square h-20 w-20 overflow-hidden rounded-full group-hover:opacity-75"
              style={{
                border:
                  collectionHandle === collection.handle && '2px solid #40733E',
              }}
            >
              <Image
                src={collection.imageSrc}
                alt="product category image"
                fill
                className="object-contain object-center"
              />
            </div>
            <div
              className="font-questrial text-center text-xs text-primary font-bold"
              style={{
                color: collectionHandle === collection.handle && '#40733E',
              }}
            >
              {collection.name}
            </div>
          </Link>
        ))}
      </div>

      {/* BANNER */}
      <div className="w-full rounded-2xl h-[216px] lg:h-[600px] bg-white overflow-hidden">
        <Image
          height={600}
          width={600}
          className="h-full w-full object-cover"
          src={
            collection?.image?.url
              ? collection?.image?.url
              : '/assets/banners/collection-fallback.png'
          }
        />
      </div>

      {/* COLLECTIONS DESKTOP */}
      <div className="hidden lg:flex items-center overflow-x-scroll justify-start lg:justify-center gap-9">
        {COLLECTIONS.map((collection, idx) => (
          <Link
            href={collection.href}
            key={collection.handle}
            className="flex flex-col items-center gap-4"
          >
            <div
              className="relative aspect-square h-28 w-28 overflow-hidden rounded-full group-hover:opacity-75"
              style={{
                border:
                  collectionHandle === collection.handle && '4px solid #40733E',
              }}
            >
              <Image
                src={collection.imageSrc}
                alt="product category image"
                fill
                className="object-contain object-center"
              />
            </div>
            <div
              className="font-questrial text-primary font-bold"
              style={{
                color: collectionHandle === collection.handle && '#40733E',
              }}
            >
              {collection.name}
            </div>
          </Link>
        ))}
      </div>

      {/* BEST SELLERS */}
      {bestSellingProducts.length > 0 && (
        <div>
          <div className="font-fraunces font-semibold text-xl mb-4 text-primary">
            {collection.title} Bestsellers
          </div>
          <div className="flex lg:grid grid-cols-1 overflow-x-scroll lg:grid-cols-4 gap-5">
            {bestSellingProducts?.map((prod) => (
              <ProductCard product={prod.node} key={prod.node.id} />
            ))}
          </div>
        </div>
      )}

      {/* BENEFITS */}
      <div>
        <div className="font-fraunces font-semibold text-xl mb-4 text-primary">
          Benefits of {collection.title}
        </div>
        <div className="w-full h-[230px]">
          <BenefitsSlider />
        </div>
      </div>

      {/* TASTE */}
      <div>
        <div className="font-fraunces font-semibold text-xl mb-4 text-primary">
          Taste of {collection.title}
        </div>
        <div className="w-full rounded-2xl h-[216px] lg:h-[600px] bg-white overflow-hidden">
          <CollectionVideo />
        </div>
      </div>

      {/* ALL PRODUCTS */}

      {allProducts.length > 0 && (
        <div>
          <div className="font-fraunces font-semibold text-xl mb-4 text-primary">
            All {collection.title} Products
          </div>
          <div className="grid grid-cols-1 justify-center items-center overflow-x-scroll lg:grid-cols-4 gap-5">
            {allProducts?.map((prod) => (
              <ProductCard product={prod.node} key={prod.node.id} />
            ))}
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default page;
