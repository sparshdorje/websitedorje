import CollectionBenefitsSlider from '@/components/CollectionBenefitsSlider';
import CollectionsBox from '@/components/CollectionsBox';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import SpotifyPlaylistSlider from '@/components/SpotifyPlaylistSlider';
import ProductCard from '@/components/ProductCard';
import AllCollections from '@/components/AllCollections';
import { ASSETS } from '@/config';
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

export async function generateMetadata({ params: { collectionHandle } }) {
  const collection = await getCollection(collectionHandle);
  const { title, description } = collection || {};

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://dorjeteas.com/collections/${collectionHandle}`,
      siteName: 'Dorje Teas',
    },
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
        fetchedProducts?.data?.data?.collection?.products?.edges
          ?.slice(4)
          .concat(bestSellingProductsData);

      return {
        allProducts: allProductsData || [],
        bestSellingProducts: bestSellingProductsData || [],
      };
    } catch (e) {
      console.log(e);
    }
  };

  const collection = (await getCollection(collectionHandle)) || [];
  const { allProducts = [], bestSellingProducts = [] } =
    (await getProducts()) || {};

  return (
    <div className={'pt-8 pb-24 px-0 w-full grid grid-cols-1 gap-10 lg:gap-12'}>
      {/* COLLECTIONS */}
      <MaxWidthWrapper className={'px-0'}>
        <CollectionsBox
          collectionHandle={collectionHandle}
          showTransition={false}
        />
      </MaxWidthWrapper>

      {/* BANNER */}

      <MaxWidthWrapper className={'max-w-screen-xl '}>
        <div className="w-full h-[220px] rounded-lg lg:h-[750px] bg-white overflow-hidden">
          {collection?.image?.url ? (
            <Image
              loading="lazy"
              height={800}
              width={800}
              alt="banner"
              className="h-full w-full object-cover object-top"
              src={collection?.image?.url}
            />
          ) : (
            <div className="h-full w-full relative">
              <Image
                loading="eager"
                src={`${ASSETS.BANNERS}/collection-fallback.webp`}
                width={800}
                height={800}
                alt={collection.title}
                className="h-full w-full absolute object-cover object-center z-10"
              />
              <div className="absolute z-30 h-full w-full bg-black bg-opacity-60 flex items-center justify-center text-white font-fraunces text-2xl lg:text-5xl">
                {collection.title}
              </div>
            </div>
          )}
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

      {/* ALL PRODUCTS */}

      {collectionHandle !== 'shop-all' ? (
        allProducts.length > 0 && (
          <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
            <div className="px-4 lg:px-0 font-fraunces text-center lg:text-left font-semibold text-xl mb-4 text-primary">
              All {collection.title} Products
            </div>
            <div className="px-4 lg:px-0 flex flex-wrap items-center justify-center lg:grid-cols-4 lg:grid gap-5 py-2">
              {allProducts?.map((prod) => (
                <ProductCard product={prod.node} key={prod.node.id} />
              ))}
            </div>
          </MaxWidthWrapper>
        )
      ) : (
        <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
          <AllCollections />
        </MaxWidthWrapper>
      )}

      {/* SPOTIFY PLAYLIST */}
      <MaxWidthWrapper className={'max-w-screen-xl px-0'}>
        <div className="px-4 lg:px-0 font-fraunces font-semibold text-xl mb-4 text-primary">
          Special Playlists Curated for You
        </div>
        <div className="w-full h-[100px] lg:h-[400px]">
          <SpotifyPlaylistSlider />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
