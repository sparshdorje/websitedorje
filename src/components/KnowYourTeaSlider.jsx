'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import LeftArrow from '@/components/LeftArrow';
import RightArrow from '@/components/RigthArrow';
import useSlider from '@/hooks/useSlider';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const KnowYourTeaSlider = ({ productHandle }) => {
  const isMobile = window.innerWidth < 768;
  const {
    swiper,
    slideConfig,
    setSwiper,
    activeStyles,
    inactiveStyles,
    knowYourTeaUrls,
  } = useSlider({ productHandle });
  return (
    <div className="relative lg:px-10 overflow-hidden aspect-[16/8] lg:aspect-video w-full">
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
        slidesPerView={isMobile ? 1.2 : 1}
        navigation={{ prevEl: 'prev-arrow', nextEl: 'next-arrow' }}
        freeMode={true}
        grabCursor={true}
        spaceBetween={isMobile ? 10 : 50}
        modules={[Autoplay, Pagination, Navigation]}
        className="flex w-full h-full !px-3 !lg:px-0"
      >
        {knowYourTeaUrls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10  relative h-full w-full">
            <Image
              fill
              loading="lazy"
              className="h-full w-full object-cover object-center rounded-xl"
              src={url}
              alt="Testimonial image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default KnowYourTeaSlider;
