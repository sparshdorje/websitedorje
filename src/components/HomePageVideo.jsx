'use client';

import ReactPlayer from 'react-player';

const HomePageVideo = () => {
  return (
    <>
      <ReactPlayer
        url={'https://www.youtube.com/watch?v=2zNyX0jeSgk'}
        height="100%"
        width="100%"
        className="rounded-xl overflow-hidden h-full object-cover aspect-video"
        controls
      />
    </>
  );
};

export default HomePageVideo;
