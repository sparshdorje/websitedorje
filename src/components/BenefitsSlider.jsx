'use client';

import useSlider from '@/hooks/useSlider';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BenefitsSlider = ({
  benefits = [
    'Many wellness teas are rich in antioxidants',
    'Boosts the immune system, helping the body.',
    'Chamomile and lavender, are known for their calming effects.',
    'Many wellness teas are rich in antioxidants',
  ],
}) => {
  const isMobile = window.innerWidth < 768;
  const { swiper, slideConfig, setSwiper, activeStyles, inactiveStyles } =
    useSlider({ urls: benefits });

  const COLORS = [
    { mainColor: '#894848', backgroundColor: '#D69595' },
    { mainColor: '#567591', backgroundColor: '#95B7D6' },
    { mainColor: '#40733E', backgroundColor: '#7CAF7A' },
    { mainColor: '#894848', backgroundColor: '#D69595' },
  ];

  return (
    <div className="relative overflow-hidden w-full">
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        slidesPerView={isMobile ? 1.3 : 4}
        navigation={{ prevEl: 'prev-arrow', nextEl: 'next-arrow' }}
        freeMode={true}
        grabCursor={true}
        spaceBetween={isMobile ? 30 : 50}
        modules={[Autoplay, Pagination, Navigation]}
        className="flex h-full w-full"
      >
        {benefits.map((benefit, i) => (
          <SwiperSlide
            key={i}
            className="relative px-4 lg:px-0 !h-[230px] w-full"
          >
            <div
              className="h-full w-full flex flex-col items-start gap-2 justify-start p-6 rounded-xl"
              style={{
                background: COLORS[i].backgroundColor,
                border: `3px solid ${COLORS[i].mainColor}`,
              }}
            >
              <div className="" style={{ color: COLORS[i].mainColor }}>
                Benefit {i + 1}
              </div>
              <div
                className="font-fraunces font-semibold text-xl text-white"
                style={{ textShadow: `2px 2px 0px ${COLORS[i].mainColor}` }}
              >
                {benefit}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BenefitsSlider;
