import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { ASSETS } from '@/config';
import React from 'react';

export async function generateMetadata() {
  return {
    title: 'Subscription policy',
    description:
      'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
    openGraph: {
      title: 'Subscription policy',
      description:
        'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
      url: `https://dorjeteas.com/policies/subscription-policy`,
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
          Subscription policy
        </div>

        <div className="font-questrial text-lg text-primary w-full font-semibold">
          Subscriptions
        </div>

        <div className="font-questrial text-lg text-primary w-full">
          When you purchase a subscription you'll receive repeat deliveries.
          These are based on the subscription frequency that you select. All
          subscriptions last for 1 year.
        </div>

        <div className="font-questrial text-lg text-primary w-full">
          The price mentioned is for the whole year. You will pay only once at
          the beginning.
        </div>

        <div className="font-questrial text-lg text-primary w-full">
          Due to RBI's limitation on autocharge of cards, we are only able to
          offer prepaid subscriptions. You pay in the beginning of the year and
          receive teas throughout the year.
        </div>

        <div className="font-questrial text-lg text-primary w-full">
          If you want to cancel your subscription, you can do it at any time.
          There will be no cancellation fee but we will refund the money based
          on one time purchase cost. For ex, if a customer cancels a Quarterly
          First Flush Subscription after 2 deliveries, we will refund the full
          amount minus cost of 2 packets of First Flush Tea of One Time
          Purchase.
        </div>

        <div className="font-questrial text-lg text-primary w-full">
          For any questions, queries please reach out to us at
          team@dorjeteas.com.
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
