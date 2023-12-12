// import AddToCartButton from '@/components/AddToCartButton';
// import ImageSlider from '@/components/ImageSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
// import ProductReel from '@/components/ProductReel';
import { PRODUCT_CATEGORIES } from '@/config';
// import { getPayloadClient } from '@/get-payload';
import { formatPrice } from '@/lib/utils';
import { Check, Shield } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
];

const Page = async ({ params }) => {
  const { productHandle } = params;

  return (
    <MaxWidthWrapper>
      {/* <div className="lg:max-w-lg lg:self-end py-3">
        <ol className="flex items-center">
          {BREADCRUMBS.map((breadcrumb, i) => (
            <li key={breadcrumb.href}>
              <div className="flex items-center text-sm">
                <Link
                  href={breadcrumb.href}
                  className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                >
                  {breadcrumb.name}
                </Link>
                {i !== BREADCRUMBS.length - 1 ? (
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div> */}
    </MaxWidthWrapper>
  );
};

export default Page;
