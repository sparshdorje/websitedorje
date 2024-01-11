'use client';

import Image from 'next/image';
import React from 'react';
import ReactPlayer from 'react-player';

const HomePageVideo = () => {
  return (
    <>
      <ReactPlayer
        url={'/assets/brand-story/1.mp4'}
        height="100%"
        width="100%"
        className="rounded-xl overflow-hidden h-full object-fill"
        loop
        controls
        playing
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
            src={'/assets/brand-story/thumbnails/1.png'}
          />
        }
        light={'/assets/brand-story/thumbnails/1.png'}
      />
    </>
  );
};

export default HomePageVideo;
