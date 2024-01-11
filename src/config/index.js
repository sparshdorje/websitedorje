export const COLLECTIONS = [
  {
    name: 'Darjeeling Tea',
    href: `/collections/darjeeling-tea`,
    handle: 'darjeeling-tea',
    imageSrc: '/assets/shop-now/darjeeling-tea.png',
  },
  {
    name: 'Wellness Range',
    href: '/collections/wellness-range',
    handle: 'wellness-range',
    imageSrc: '/assets/shop-now/wellness-range.png',
  },
  {
    name: 'Original Chai',
    href: '/collections/the-original-chai-by-dorje-teas',
    handle: 'the-original-chai-by-dorje-teas',
    imageSrc: '/assets/shop-now/original-chai.png',
  },
  {
    name: 'Artisanal Teas',
    href: '/collections/artisanal-teas',
    handle: 'artisanal-teas',
    imageSrc: '/assets/shop-now/artisanal-tea.png',
  },
  {
    name: 'Special Offers',
    href: '/collections/offers',
    handle: 'offers',
    imageSrc: '/assets/shop-now/special-offers.png',
  },
  {
    name: 'Gift Boxes',
    href: '/collections/gift-boxes',
    handle: 'gift-boxes',
    imageSrc: '/assets/shop-now/gift-boxes.png',
  },
];

export const HOME_PAGE_AS_SEEN_ON = [
  '/assets/icons/bloomberg.png',
  '/assets/icons/times.png',
  '/assets/icons/gq.png',
];

export const PRODUCT_CATEGORIES = [
  {
    label: 'SHOP NOW',
    value: 'shop_now',
    featured: COLLECTIONS,
    dropdown: true,
    cardType: 'collection-card',
  },
  {
    label: 'SHOP BY NEED',
    value: 'shop_by_need',
    featured: [
      {
        name: 'Improved Digestion',
        href: `/products?collection=improved-digestions`,
        imageSrc: '/assets/shop-by-need/improved-digestion.png',
        description:
          'An assorted range of teas, that help you improve your digestion',
      },
      {
        name: 'Hangover Cure',
        href: '/products?collection=hangover-cure',
        imageSrc: '/assets/shop-by-need/hangover-cure.png',
        description:
          'An assorted range of teas, that help you improve your digestion',
      },
    ],
    dropdown: true,
    cardType: 'rectangle-card',
  },
  {
    label: 'NEW: ORIGINAL CHAI',
    value: 'new_original_chai',
    featured: [
      {
        name: 'The Original Chai',
        href: `/products/original-chai`,
        imageSrc: '/assets/new-launch/original-chai.png',
        newLaunch: true,
        description:
          'Original Chai is a premium Chai prepared with Gently Rolled Aromatic CTC leaves. Made by a special process, it is a rich, creamy & aromatic doodh Chai. ',
      },
    ],
    dropdown: true,
    cardType: 'rectangle-card',
  },
  {
    label: 'EXPERIENCE',
    value: 'experience',
    featured: [
      {
        name: 'Secret Brewing Experience',
        href: `/products?collection=icons`,
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'Visit Darjeeling',
        href: '/products?collection=icons&sort=desc',
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Birds of Darjeeling',
        href: '/products?collection=icons',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
      {
        name: 'Moonlight Plucking',
        href: '/products?collection=icons',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
    ],
    dropdown: false,
  },
  {
    label: 'LEARN MORE',
    value: 'learn_more',
    featured: [
      {
        name: 'Tea Pairs Best With',
        href: `/products?collection=icons`,
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'Tea Cultures Of India ',
        href: '/products?collection=icons&sort=desc',
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Tea Time Recipes ',
        href: '/products?collection=icons',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
      {
        name: 'Our Most Loyal TeeTotallers',
        href: '/products?collection=icons',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
      {
        name: 'Brew Tea in the best ways',
        href: '/products?collection=icons',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
    ],
    dropdown: false,
  },
];
