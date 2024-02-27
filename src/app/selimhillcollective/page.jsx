import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';

const page = () => {
  return (
    <MaxWidthWrapper className={'py-8 h-fit'}>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScAPw2XnjgOj-RYRRIcBaSk5BSYVgR0YKOTBwFwHp6hkWXjUg/viewform?embedded=true"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        className=" h-[5200px] lg:h-[3800px] w-full"
      >
        Loading…
      </iframe>
    </MaxWidthWrapper>
  );
};

export default page;
