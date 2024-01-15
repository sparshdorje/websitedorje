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
import { motion } from 'framer-motion';

const BrewingGuideSlider = ({ productHandle }) => {
  const isMobile = window.innerWidth < 768;

  const {
    swiper,
    slideConfig,
    setSwiper,
    activeStyles,
    inactiveStyles,
    brewingGuideUrls,
  } = useSlider({ productHandle });

  return (
    <motion.div
      initial={{ opacity: 0, x: -70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative lg:px-10 overflow-hidden"
    >
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
        className="flex !px-3 !lg:px-0"
      >
        {brewingGuideUrls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              width="640"
              height="360"
              loading="lazy"
              className="object-cover object-center rounded-3xl"
              alt="brewing guide"
              src={url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default BrewingGuideSlider;
