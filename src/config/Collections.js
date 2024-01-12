import { ASSETS } from './index';

const COLLECTIONS = [
  {
    name: 'Darjeeling Tea',
    href: `/collections/black-tea`,
    handle: 'black-tea',
    imageSrc: `${ASSETS.SHOP_NOW}/darjeeling-tea.png`,
  },
  {
    name: 'Wellness Range',
    href: '/collections/wellness-range',
    handle: 'wellness-range',
    imageSrc: `${ASSETS.SHOP_NOW}/wellness-range.png`,
  },
  {
    name: 'Original Chai',
    href: '/collections/milk-tea',
    handle: 'milk-tea',
    imageSrc: `${ASSETS.SHOP_NOW}/original-chai.png`,
  },
  {
    name: 'Artisanal Teas',
    href: '/collections/other-teas',
    handle: 'other-teas',
    imageSrc: `${ASSETS.SHOP_NOW}/artisanal-tea.png`,
  },
  {
    name: 'Special Offers',
    href: '/collections/offers',
    handle: 'offers',
    imageSrc: `${ASSETS.SHOP_NOW}/special-offers.png`,
  },
  {
    name: 'Gift Boxes',
    href: '/collections/gift-boxes',
    handle: 'gift-boxes',
    imageSrc: `${ASSETS.SHOP_NOW}/gift-boxes.png`,
  },
];

export const COLLECTION_BENEFITS = {
  'black-tea': [
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/1.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/2.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/3.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/4.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/5.webp`,
  ],
  'wellness-range': [
    `${ASSETS.COLLECTION_BENEFITS}/flavoured-tea/0.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/flavoured-tea/1.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/flavoured-tea/2.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/flavoured-tea/3.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/flavoured-tea/4.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/flavoured-tea/5.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/flavoured-tea/6.webp`,
  ],
  'milk-tea': [
    `${ASSETS.COLLECTION_BENEFITS}/og-chai/1.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/og-chai/2.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/og-chai/3.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/og-chai/4.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/og-chai/5.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/og-chai/6.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/og-chai/7.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/og-chai/8.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/og-chai/9.webp`,
  ],
  'other-teas': [
    `${ASSETS.COLLECTION_BENEFITS}/moonlight-tea/0.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/moonlight-tea/1.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/moonlight-tea/2.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/moonlight-tea/3.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/moonlight-tea/4.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/moonlight-tea/5.webp`,
  ],
  offers: [
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/1.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/2.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/3.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/4.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/5.webp`,
  ],
  'gift-boxes': [
    `${ASSETS.COLLECTION_BENEFITS}/gift-boxes/0.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/gift-boxes/1.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/gift-boxes/2.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/gift-boxes/3.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/gift-boxes/4.webp`,
  ],
  default: [
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/1.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/2.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/3.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/4.webp`,
    `${ASSETS.COLLECTION_BENEFITS}/black-tea/5.webp`,
  ],
};

export default COLLECTIONS;
