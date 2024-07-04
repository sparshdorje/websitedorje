import Image from 'next/image';
import MaxWidthWrapper from './MaxWidthWrapper';

const Ticker = () => {
  return (
    <div className="bg-primary px-3 lg:px-0 py-3">
      <MaxWidthWrapper
        className={'flex items-center justify-center gap-4 lg:gap-3'}
      >
        {/* <div className="h-10 w-10 lg:h-8 lg:w-8">
          <Image
            src={'/assets/icons/announcement.png'}
            className="h-full w-full object-contain"
            width={100}
            height={100}
            alt="announcement icon"
            loading="eager"
          />
        </div> */}
        <div className="text-white font-medium text-center font-questrial text-sm lg:text-base">
Welcome Offer: Use code DORJE20 for 20% off | Min Cart Value: Rs. 999  </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Ticker;
