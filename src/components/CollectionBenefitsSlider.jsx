'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import LeftArrow from '@/components/LeftArrow';
import RightArrow from '@/components/RigthArrow';
import useSlider from '@/hooks/useSlider';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const CollectionBenefitsSlider = ({ collectionHandle }) => {
  const isMobile = window.innerWidth < 768;
  const {
    swiper,
    slideConfig,
    setSwiper,
    activeStyles,
    inactiveStyles,
    collectionBenefitsUrl,
  } = useSlider({ collectionHandle });
  return (
    <motion.div
      initial={{ opacity: 0, x: -70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative aspect-[16/8] w-full h-full"
    >
      <div className="hidden lg:block absolute inset-0 transition">
        <RightArrow
          activeStyles={activeStyles}
          inactiveStyles={inactiveStyles}
          swiper={swiper}
          slideConfig={slideConfig}
          extraStyles={'-right-10'}
        />
        <LeftArrow
          activeStyles={activeStyles}
          inactiveStyles={inactiveStyles}
          swiper={swiper}
          slideConfig={slideConfig}
          extraStyles={'-left-10'}
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
        className="flex w-full !px-2.5 !lg:px-0 h-full"
      >
        {collectionBenefitsUrl.map((url, i) => (
          <SwiperSlide key={url} className="-z-10 h-full w-full">
            <div>
              <Image
                fill
                loading="eager"
                className="h-full w-full object-cover object-center shadow-md rounded-xl"
                src={url}
                alt="Collection Benefits"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default CollectionBenefitsSlider;
