import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { ASSETS } from '@/config';
import React from 'react';

export async function generateMetadata() {
  return {
    title: 'Refund policy',
    description:
      'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
    openGraph: {
      title: 'Refund policy',
      description:
        'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
      url: `https://dorjeteas.com/policies/refund-policy`,
      siteName: 'Dorje Teas',
      images: [
        {
          url: `${ASSETS.ICONS}/dorje-logo.png`, // Must be an absolute URL
        },
      ],
    },
  };
}

const page = () => {
  return (
    <div className="w-full h-full bg-white">
      <MaxWidthWrapper
        className={
          'mx-auto pt-8 pb-20 w-full flex flex-col items-center gap-10 max-w-screen-md text-left'
        }
      >
        <div className="font-fraunces font-semibold text-2xl lg:text-2xl text-primary">
          Refund Policy
        </div>

        <div className="font-questrial text-lg text-primary">
          We hope that you love Dorje products as much as we do but if you
          aren’t satisfied with your order, you can reach out to
          team@dorjeteas.com and our Customer Service experts will be happy to
          assist you in the best way possible.
        </div>

        <div className="font-questrial text-lg text-primary w-full font-semibold">
          Cancellations:
        </div>

        <ul className="font-questrial text-lg text-primary">
          <li className="mb-4">
            All cancellation requests must be initiated within 24 hours of
            placing the order or before your order has been shipped, whichever
            happens first.
          </li>
          <li className="mb-4">
            In case your order has already been shipped, it will only be
            eligible for replacement or refund if found damaged or unfit for
            consumption.
          </li>
        </ul>

        <div className="font-questrial text-lg text-primary w-full font-semibold">
          Returns & Replacements:
        </div>

        <ul className="font-questrial text-lg text-primary">
          <li className="mb-4">
            If the product is received in damaged form, you must write to us
            within 48 hours of delivery so that we can expedite your replacement
            request. Please attach a picture of the delivered order for our
            internal quality checks.
          </li>
          <li className="mb-4">
            If in case you have received a product that is different from what
            you had ordered, please notify us within 48 hours of delivery so
            that we can expedite your return request. To be eligible for return,
            the items must be unused and unopened.
          </li>
          <li className="mb-4">
            If any item is missing from your order, please reach out to us
            within 48 hours of delivery and we will get the remaining items
            shipped.
          </li>
          <li className="mb-4">
            We ensure that you receive the freshest Teas but if in case you feel
            that it tastes bad or stale please do not hesitate to reach out to
            us within 7 days of the order delivery and we shall send a
            replacement. Please do let us know what you didn’t like exactly and
            we’ll sort it out for you.
          </li>
        </ul>

        <div className="font-questrial text-lg text-primary w-full font-semibold">
          Refunds:
        </div>

        <ul className="font-questrial text-lg text-primary">
          <li className="mb-4">
            All refunds will be processed only after internal quality checks.
            For any refund request, you must share necessary proofs. Our
            Customer Service team will notify you once the refund request has
            been approved.
          </li>
          <li className="mb-4">
            If your refund has been approved, it shall be processed within 7
            business days. If in case you don’t get your refund within the
            stipulated time, please feel free to reach out to us.
          </li>
          <li className="mb-4">
            All refunds will be processed to the original mode of payment only.
          </li>
          <li className="mb-4">
            Dorje Teas is not liable to process any refund if the request is
            initiated after 7 days of delivery or if you fail to produce
            necessary proofs.
          </li>
        </ul>

        <div className="font-questrial text-lg text-primary">
          Dorje reserves the right to modify the refund, return and cancellation
          policy without prior notice. Kindly check this page for the latest
          policies.
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
