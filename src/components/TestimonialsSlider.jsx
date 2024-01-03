'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import LeftArrow from '@/components/LeftArrow';
import RightArrow from '@/components/RigthArrow';
import useSlider from '@/hooks/useSlider';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// WEB TESTIMONIALS IMPORT
import Image from 'next/image';

// MOBILE TESTIMONIALS IMPORT

const WEB_TESTIMONIALS = [
  '/assets/testimonials/web/anupam-web.jpg',
  '/assets/testimonials/web/foodka-web.jpg',
  '/assets/testimonials/web/peyush-web.jpg',
  '/assets/testimonials/web/shivesh-web.jpg',
  '/assets/testimonials/web/vineeta-web.jpg',
  '/assets/testimonials/web/vir-web.jpg',
];

const MOBILE_TESTIMONIALS = [
  '/assets/testimonials/mobile/anupam-mobile.jpg',
  '/assets/testimonials/mobile/foodka-mobile.jpg',
  '/assets/testimonials/mobile/peyush-mobile.jpg',
  '/assets/testimonials/mobile/shivesh-mobile.jpg',
  '/assets/testimonials/mobile/vineeta-mobile.jpg',
  '/assets/testimonials/mobile/vir-mobile.jpg',
];

const TestimonialsSlider = () => {
  const isMobile = window.innerWidth < 768;
  const urls = isMobile ? MOBILE_TESTIMONIALS : WEB_TESTIMONIALS;
  const { swiper, slideConfig, setSwiper, activeStyles, inactiveStyles } =
    useSlider({ urls });

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
        className="flex w-full h-full"
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              fill
              loading="eager"
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

export default TestimonialsSlider;
