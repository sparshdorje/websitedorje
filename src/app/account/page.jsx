import React from 'react';
import { cookies } from 'next/headers';
import { getServerSideUser } from '@/lib/utils';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export const metadata = {
  title: 'My Account',
  description: 'Dorje Teas | The Original Taste of Darjeeling ',
};

const page = async () => {
  const nextCookies = cookies();
  const user = await getServerSideUser(nextCookies);

  return (
    <MaxWidthWrapper
      className={'mx-auto pt-8 pb-52 w-full grid grid-cols-1 gap-8'}
    >
      <div className={'mx-auto pt-8 pb-52 w-full grid grid-cols-1 gap-4'}>
        <div>
          <div className="font-fraunces text-primary text-xl font-semibold mb-2">
            Name
          </div>
          <div className="text-questrial text-primary text-lg font-semobold">
            {user.displayName}
          </div>
        </div>

        <div>
          <div className="font-fraunces text-primary text-xl font-semibold mb-2">
            Email
          </div>
          <div className="text-questrial text-primary text-lg font-semobold">
            {user.email}
          </div>
        </div>

        <div>
          <div className="font-fraunces text-primary text-xl font-semibold mb-2">
            Shipping Address
          </div>
          <div className="text-questrial text-primary text-lg font-semobold">
            {user.defaultAddress.address1} <br /> {user.defaultAddress.city},
            {user.defaultAddress.country}, ({user.defaultAddress.zip})
          </div>
        </div>
      </div>

      <div>{JSON.stringify(user)}</div>
    </MaxWidthWrapper>
  );
};

export default page;
