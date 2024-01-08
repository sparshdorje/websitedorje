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
      <div className={'mx-auto pt-8 pb-52 w-full grid grid-cols-1 gap-3'}>
        <div className="text-questrial text-primary text-lg font-bold">
          {user.displayName}
        </div>
        <div className="text-questrial text-primary text-lg font-bold">
          {user.email}
        </div>
      </div>

      <div>{JSON.stringify(user)}</div>
    </MaxWidthWrapper>
  );
};

export default page;
