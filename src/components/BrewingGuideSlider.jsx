'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import LeftArrow from '@/components/LeftArrow';
import RightArrow from '@/components/RigthArrow';
import useSlider from '@/hooks/useSlider';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

const BrewingGuideSlider = ({
  urls = [
    '/assets/brewing-guide/normal-tea/step-1.png',
    '/assets/brewing-guide/normal-tea/step-2.png',
    '/assets/brewing-guide/normal-tea/step-3.png',
    '/assets/brewing-guide/normal-tea/step-4.png',
    '/assets/brewing-guide/normal-tea/step-5.png',
    '/assets/brewing-guide/normal-tea/step-6.png',
  ],
}) => {
  const isMobile = window.innerWidth < 768;
  const { swiper, slideConfig, setSwiper, activeStyles, inactiveStyles } =
    useSlider({ urls });

  return (
    <div className="relative lg:px-10 overflow-hidden">
      <div className="hidden lg:block absolute inset-0 transition">
        <RightArrow
          activeStyles={activeStyles}
          inactiveStyles={inactiveStyles}
          swiper={swiper}
          slideConfig={slideConfig}
          extraStyles={'right-0'}
        />
        <LeftArrow
          activeStyles={activeStyles}
          inactiveStyles={inactiveStyles}
          swiper={swiper}
          slideConfig={slideConfig}
          extraStyles={'left-0'}
        />
      </div>
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        slidesPerView={isMobile ? 1.2 : 3}
        navigation={{ prevEl: 'prev-arrow', nextEl: 'next-arrow' }}
        freeMode={true}
        grabCursor={true}
        spaceBetween={isMobile ? 30 : 50}
        modules={[Autoplay, Pagination, Navigation]}
        className="flex"
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              width="640"
              height="360"
              className="object-cover object-center rounded-3xl"
              src={url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrewingGuideSlider;
