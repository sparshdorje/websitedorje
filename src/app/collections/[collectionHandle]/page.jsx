'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import CollectionService from '@/services/collection';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import BenefitsSlider from '@/components/BenefitsSlider';
import ReactPlayer from 'react-player';
import { COLLECTIONS } from '@/config';
import Link from 'next/link';

const page = ({ params }) => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [collection, setCollection] = useState({});
  const { collectionHandle } = params;

  const getProducts = async () => {
    const fetchedProducts = await CollectionService.getProductsInCollection({
      handle: collectionHandle,
    });
    const bestSellingProductsData =
      fetchedProducts?.data?.data?.collection?.products?.edges?.slice(0, 4);
    const allProductsData =
      fetchedProducts?.data?.data?.collection?.products?.edges?.slice(4);
    setBestSellingProducts(bestSellingProductsData);
    setAllProducts(allProductsData);
  };

  const getCollection = async () => {
    const fetchedProducts = await CollectionService.getCollectionByHandle({
      handle: collectionHandle,
    });
    const collection = fetchedProducts?.data?.data?.collection;

    setCollection(collection);
  };

  useEffect(() => {
    getCollection();
    getProducts();
  }, []);

  console.log(collection);

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
          <ReactPlayer
            url={'/assets/brand-story/1.mp4'}
            height="100%"
            width="100%"
            className="rounded-xl overflow-hidden h-full object-fill"
            loop
            controls
            playing
            playIcon={
              <Image
                height={40}
                width={40}
                alt="play icon"
                className="z-10"
                src={'/assets/icons/play-icon.png'}
              />
            }
            fallback={
              <Image
                alt="thumbnnail"
                width={'100'}
                height={'100'}
                className="z-10 h-full w-full"
                src={'/assets/brand-story/thumbnails/1.png'}
              />
            }
            light={'/assets/brand-story/thumbnails/1.png'}
          />
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
