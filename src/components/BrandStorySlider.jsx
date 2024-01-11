'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import LeftArrow from '@/components/LeftArrow';
import RightArrow from '@/components/RigthArrow';
import useSlider from '@/hooks/useSlider';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ReactPlayer from 'react-player';
import Image from 'next/image';

const BrandStorySlider = ({
  urls = [
    '/assets/brand-story/1.mp4',
    '/assets/brand-story/2.mp4',
    '/assets/brand-story/3.mp4',
    '/assets/brand-story/4.mp4',
    '/assets/brand-story/5.mp4',
    '/assets/brand-story/6.mp4',
  ],
  thumbnails = [
    '/assets/brand-story/thumbnails/1.png',
    '/assets/brand-story/thumbnails/2.png',
    '/assets/brand-story/thumbnails/3.png',
    '/assets/brand-story/thumbnails/4.png',
    '/assets/brand-story/thumbnails/5.png',
    '/assets/brand-story/thumbnails/6.png',
  ],
}) => {
  const isMobile = window && window.innerWidth < 768;
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
        slidesPerView={isMobile ? 1.2 : 4}
        navigation={{ prevEl: 'prev-arrow', nextEl: 'next-arrow' }}
        freeMode={true}
        grabCursor={true}
        spaceBetween={isMobile ? 30 : 50}
        modules={[Autoplay, Pagination, Navigation]}
        className="flex h-full w-full"
      >
        {urls.map((url, i) => (
          <SwiperSlide
            key={url}
            className="-z-10 relative !h-[535px] lg:!h-[460px] w-fill"
          >
            <ReactPlayer
              url={url}
              height="100%"
              width="100%"
              className="rounded-xl overflow-hidden h-full w-full object-fill"
              loop
              playing
              muted
              playIcon={
                <Image
                  loading="lazy"
                  height={40}
                  width={40}
                  alt="play icon"
                  className="z-10"
                  src={'/assets/icons/play-icon.png'}
                />
              }
              fallback={
                <Image
                  loading="lazy"
                  alt="thumbnnail"
                  width={'100'}
                  height={'100'}
                  className="z-10 h-full w-full"
                  src={thumbnails[i]}
                />
              }
              light={thumbnails[i]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandStorySlider;
