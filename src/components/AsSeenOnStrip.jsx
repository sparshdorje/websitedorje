import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { HOME_PAGE_AS_SEEN_ON } from '@/config/HomePage';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const AsSeenOnStrip = () => {
  return (
    <MaxWidthWrapper
      className={cn(
        'flex items-center justify-between lg:justify-center lg:gap-12 max-w-screen-xl',
        {
          'justify-start gap-4 overflow-x-scroll lg:flex-wrap':
            HOME_PAGE_AS_SEEN_ON.length > 3,
        }
      )}
    >
      {HOME_PAGE_AS_SEEN_ON.map((imgSrc, idx) => (
        <Image
          key={imgSrc}
          src={imgSrc}
          width={300}
          height={100}
          alt="logo"
          loading="lazy"
          className="h-[30px] w-[30%] lg:h-[60px] lg:!w-fit object-contain"
        />
      ))}
    </MaxWidthWrapper>
  );
};

export default AsSeenOnStrip;
