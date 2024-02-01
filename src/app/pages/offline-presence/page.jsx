import React from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { ASSETS } from '@/config';

export async function generateMetadata() {
  return {
    title: 'Offline Presence',
    description:
      'A list of the retail, offline stores where you can get Dorje Teas immediately. All these stores and cafes have tied up with Dorje Teas and are committed to making Darjeeling Tea Accessible, Avialable and Affordable. We only use whole leaf Darjeeling Tea which is plucked, packed and dispatched from Selim Hill Tea Estate',
    openGraph: {
      title: 'Offline Presence',
      description:
        'A list of the retail, offline stores where you can get Dorje Teas immediately. All these stores and cafes have tied up with Dorje Teas and are committed to making Darjeeling Tea Accessible, Avialable and Affordable. We only use whole leaf Darjeeling Tea which is plucked, packed and dispatched from Selim Hill Tea Estate',
      url: `https://dorjeteas.com/pages/offline-presence`,
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
          'mx-auto pt-8 pb-20 w-full flex flex-col items-center gap-10 max-w-screen-md text-center'
        }
      >
        <div className="font-fraunces font-semibold text-2xl lg:text-3xl text-primary">
          Authorised Resellers
        </div>

        <div className="font-questrial text-lg text-primary">
          To purchase our teas physically, you can visit the following
          locations. To become a reseller, you can write to us at
          team@dorjeteas.com.
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">MIZORAM</div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            Angela Zothankimi
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">KOLKATA</div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            The Bhawanipur House
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">
            HYDERABAD
          </div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            BSR Infinity Services Pvt. Ltd.
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">KOLKATA</div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            Basujuri | Leaf A - Fair
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">KOLKATA</div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            PERFECT T - KESTOPUR
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">KOLKATA</div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            PERFECT T - DUMDUM
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">KOLKATA</div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            PERFECT T - BAGUIATI
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">
            KURSEONG
          </div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            33DREAM CAFE
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">
            DARJEELING
          </div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            AGONY POINT - SMRITIBAN
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">KOCHI </div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            teORA Wellness Grocery
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">
            BENGALURU
          </div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            Humble Bean Cafe
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white w-full ">
          <div className="font-questrial font-medium text-primary">KOLKATA</div>
          <div className="font-fraunces font-semibold text-xl lg:text-2xl text-primary">
            Starmark
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
