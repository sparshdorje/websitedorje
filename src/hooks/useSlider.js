import { useEffect, useState } from 'react';
import { KNOW_YOUR_TEA_IMAGES } from '@/config/knowYourTea';
import { BREWING_GUIDE_URLS } from '@/config/BrewingGuide';
import { COLLECTION_BENEFITS } from '@/config/Collections';

const useSlider = ({ urls, productHandle, collectionHandle }) => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ONLY FOR BREWING GUIDE
  const getBrewingGuideUrls = () => {
    switch (productHandle) {
      case 'original-chai':
        return BREWING_GUIDE_URLS.doodhTea;
        break;
      default:
        return BREWING_GUIDE_URLS.default;
    }
  };

  const brewingGuideUrls = getBrewingGuideUrls();

  // ONLY FOR KNOW YOUR GUIDE
  const getKnowYourTeaUrls = () => {
    const knowYourTeaUrls = KNOW_YOUR_TEA_IMAGES[productHandle];

    if (knowYourTeaUrls) {
      return knowYourTeaUrls;
    } else {
      return KNOW_YOUR_TEA_IMAGES['default'];
    }
  };

  const knowYourTeaUrls = getKnowYourTeaUrls();

  // ONLY FOR COLLECTION BENEFITS
  const getCollectionBenfitsUrls = () => {
    const collectionBenefitsUrl = COLLECTION_BENEFITS[collectionHandle];

    if (collectionBenefitsUrl) {
      return collectionBenefitsUrl;
    } else {
      return COLLECTION_BENEFITS['default'];
    }
  };

  const collectionBenefitsUrl = getCollectionBenfitsUrls();

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd:
      activeIndex ===
      (urls?.length ||
        brewingGuideUrls?.length ||
        knowYourTeaUrls?.length ||
        collectionBenefitsUrl.length) -
        1,
  });

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd:
          activeIndex ===
          (urls?.length ||
            brewingGuideUrls?.length ||
            knowYourTeaUrls?.length ||
            collectionBenefitsUrl.length) -
            1,
      });
    });
  }, [swiper, urls]);

  const activeStyles =
    'active:scale-[0.97] grid hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full bg-black';
  const inactiveStyles = 'hidden text-gray-400';

  return {
    swiper,
    activeIndex,
    slideConfig,
    setSwiper,
    activeStyles,
    inactiveStyles,
    brewingGuideUrls,
    knowYourTeaUrls,
    collectionBenefitsUrl,
  };
};

export default useSlider;
