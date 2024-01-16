import BestsellerCard from '@/components/BestsellerCard';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { APP_CONSTATNTS, ASSETS } from '@/config';
import CollectionService from '@/services/collection';
import Image from 'next/image';
import Link from 'next/link';

const fetchProducts = async () => {
  try {
    const fetchedProducts = await CollectionService.getProductsInCollection({
      handle: 'featured-collection-home-page',
    });

    const products = fetchedProducts?.data?.data?.collection?.products?.edges;

    return products.slice(0, 5);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

export async function generateMetadata() {
  return {
    title: 'About Us',
    description:
      'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
    openGraph: {
      title: 'About Us',
      description:
        'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
      url: `https://dorjeteas.com/about-us`,
      siteName: 'Dorje Teas',
      images: [
        {
          url: `${ASSETS.ICONS}/dorje-logo.png`, // Must be an absolute URL
        },
      ],
    },
  };
}

const page = async () => {
  const products = await fetchProducts();

  return (
    <div className={'pb-0 w-full grid grid-cols-1 lg:gap-12'}>
      {/* HERO SECTION */}
      <div className="bg-[#679FA1] bg-opacity-50 w-full h-[700px]">
        <div
          className={
            'flex flex-col-reverse lg:flex-row items-center h-full gap-8'
          }
        >
          <div className="flex flex-col items-start gap-8 px-4 pb-8 lg:px-20">
            <div className="font-fraunces text-4xl lg:text-6xl text-primary">
              Welcome to <br /> Darjeeling
            </div>
            <div className="font-questrial text-lg lg:text-xl text-primary">
              We are based out of the Heritage Selim Hill Tea Garden (est.
              1871)-- the Maharani of Darjeeling estates.
            </div>
            <Link
              target="_blank"
              href={`${APP_CONSTATNTS.SHOPYFY_URL}/pages/our-farms`}
            >
              <Button className={'rounded-full'}>Read More</Button>
            </Link>
          </div>

          <div className="flex flex-col items-start gap-8 w-full lg:w-[60%] h-full">
            <Image
              loading="eager"
              height={700}
              width={700}
              alt="background image"
              src={`${ASSETS.ABOUT_US}/hero-bg.webp`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="w-full h-[700px] mb-12 lg:mb-0">
        <MaxWidthWrapper
          className={
            'flex flex-col lg:flex-row items-center justify-between h-full gap-16 px-0'
          }
        >
          <div className="flex flex-col lg:rounded-xl lg:overflow-hidden items-start gap-8 w-full h-full lg:w-[50%] lg:h-[80%]">
            <Image
              loading="lazy"
              height={700}
              width={700}
              alt="background image"
              src={`${ASSETS.ABOUT_US}/about-bg.webp`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-8 w-full px-3 lg:px-0 lg:w-[40%]">
            <div className="font-fraunces text-4xl lg:text-6xl text-primary">
              About Us
            </div>
            <div className="font-questrial text-lg lg:text-xl text-primary">
              We started Dorje Teas in 2021 to revive our family's heritage tea
              garden, which was on the verge of bankruptcy. We realised that
              India's best teas get exported through middlemen. This way,
              neither the Indian consumers get an authentic product nor the
              producers get a fair share.
            </div>
            <Link
              target="_blank"
              href={`${APP_CONSTATNTS.SHOPYFY_URL}/pages/our-story`}
            >
              <Button className={'rounded-full'}>Read More</Button>
            </Link>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* OUR PRODUCTS */}
      <div className="bg-[#EFE1D4] py-8 lg:py-16 w-screen h-fit mb-12 lg:mb-0">
        <MaxWidthWrapper
          className={
            'flex items-center px-0 justify-start lg:justify-center w-full h-full gap-8'
          }
        >
          <div className="lg:flex lg:flex-col lg:items-start lg:w-fit w-full">
            <div className="px-2.5 lg:px-0 font-fraunces text-4xl lg:text-6xl mb-8 text-primary">
              Our Products
            </div>
            <div className="flex px-2.5 lg:px-0 justify-start lg:justify-center w-full items-start overflow-x-scroll gap-8">
              {products?.map((prod, i) => (
                <BestsellerCard
                  product={prod.node}
                  key={i}
                  className={'min-w-[250px] w-[250px] h-[420px]'}
                  truncateLimit={60}
                  variantTruncateLimit={20}
                />
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* VISIT US */}
      <div className="w-full h-[700px] mb-12 lg:mb-0">
        <MaxWidthWrapper
          className={
            'flex flex-col lg:flex-row  items-center justify-between h-full gap-16 px-0'
          }
        >
          <div className="flex flex-col items-start gap-8 w-full lg:w-[40%] px-3 lg:px-0">
            <div className="font-fraunces text-4xl lg:text-6xl text-primary">
              Visit us
            </div>
            <div className="font-questrial text-lg lg:text-xl text-primary">
              If you find yourself in Darjeeling, drop in to have a cup of tea
              with us at our heritage factory. You can find the location below.
              You can write to us at{' '}
              <Link href={'mailto:editor@dorjeteas.com'}>
                editor@dorjeteas.com.
              </Link>
            </div>
            <Link
              target="_blank"
              href={'https://maps.app.goo.gl/YyJf6zZaexiWYGZHA'}
            >
              <Button className={'rounded-full'}>Get directions</Button>
            </Link>
          </div>

          <div className="flex flex-col lg:rounded-md overflow-hidden items-start gap-8 w-full h-full lg:w-[50%] lg:h-[80%]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4371.200948763955!2d88.31649677608554!3d26.83987376321578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e437490e145cb1%3A0x223b23961dc9790c!2sDorje%20Teas!5e1!3m2!1sen!2sin!4v1705064139622!5m2!1sen!2sin"
              allowfullscreen=""
              loading="lazy"
              className="h-full w-full object-cover"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default page;
