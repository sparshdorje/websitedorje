export const PRODUCT_CATEGORIES = [
  {
    label: 'SHOP NOW',
    value: 'shop_now',
    featured: [
      {
        name: 'Editor picks',
        href: `/products?category=ui_kits`,
        imageSrc: '/nav/ui-kits/mixed.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=ui_kits&sort=desc',
        imageSrc: '/nav/ui-kits/blue.jpg',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=ui_kits',
        imageSrc: '/nav/ui-kits/purple.jpg',
      },
    ],
  },
  {
    label: 'SHOP BY NEED',
    value: 'shop_by_need',
    featured: [
      {
        name: 'Favorite Icon Picks',
        href: `/products?category=icons`,
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=icons&sort=desc',
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Bestselling Icons',
        href: '/products?category=icons',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'NEW: ORIGINAL CHAI',
    value: 'shop_by_need',
    link: '/new',
  },
  {
    label: 'EXPERIENCE',
    value: 'experience',
    link: '/experience',
  },
  {
    label: 'LEARN MORE',
    value: 'learn_more',
    link: '/learn-more',
  },
];
