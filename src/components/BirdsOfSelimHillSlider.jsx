'use client';

import LeftArrow from '@/components/LeftArrow';
import useSlider from '@/hooks/useSlider';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BIRDS_OF_SELIM_HILL } from '@/config/BirdsOfSelimHill';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import RightArrow from './RigthArrow';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';

const BirdsOfSelimHillSlider = ({ urls = BIRDS_OF_SELIM_HILL }) => {
  const isMobile = window && window.innerWidth < 768;
  const { swiper, slideConfig, setSwiper, activeStyles, inactiveStyles } =
    useSlider({ urls });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="relative p-b-8 overflow-hidden h-full  lg:px-10 w-full"
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
        spaceBetween={isMobile ? 10 : 50}
        modules={[Autoplay, Pagination, Navigation]}
        className="flex !lg:px-0"
      >
        {urls.map((url, i) => (
          <SwiperSlide
            key={i}
            className="-z-10 !h-[306px] relative px-4 lg:px-0 lg:!h-[406px] w-fill"
          >
            <Link href={url.blogUrl} className="h-full w-full cursor-pointer">
              <div className="relative top-0 bottom-0 right-0 h-full w-full overflow-hidden rounded-2xl">
                <div className="absolute z-3 bg-black bg-opacity-50 h-full w-full"></div>
                <Image
                  width="640"
                  height="236"
                  loading="lazy"
                  className="object-cover z-2 h-full w-full object-center"
                  alt="brewing guide"
                  src={url.image}
                />
              </div>

              <div className="absolute flex items-end justify-center pb-3 w-full top-0 bottom-0 right-0 font-fraunces text-white text-xl lg:text-2xl">
                <div>{url.name}</div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default BirdsOfSelimHillSlider;
