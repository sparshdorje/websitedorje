'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import useSlider from '@/hooks/useSlider';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import Image from 'next/image';
import { HOME_PAGE_BANNERS } from '@/config/HomePage';
import Link from 'next/link';

const HomePageBannerSlider = () => {
  const urls = HOME_PAGE_BANNERS;
  const { swiper, slideConfig, setSwiper, activeStyles, inactiveStyles } =
    useSlider({ urls });

  return (
    <div className="relative overflow-hidden aspect-[16/9] h-[250px] lg:h-[840px] w-full">
      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`;
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        slidesPerView={1}
        freeMode={true}
        grabCursor={true}
        autoplay
        spaceBetween={50}
        modules={[Autoplay, Pagination, Navigation]}
        className="flex w-full h-full"
      >
        {urls.map((url, i) => (
          <SwiperSlide key={url} className="-z-10 relative h-full w-full">
            <Link href={url.href}>
              <Image
                fill
                loading="eager"
                className="h-full w-full object-cover object-top"
                src={url.imgUrl}
                alt="Testimonial image"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomePageBannerSlider;
