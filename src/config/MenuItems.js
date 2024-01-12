import { APP_CONSTATNTS, ASSETS } from './index';
import COLLECTIONS from './Collections';
import SHOP_BY_NEED from './ShopByNeed';

export const MENU_ITEMS = [
  {
    label: `SHOP NOW`,
    value: `shop_now`,
    featured: COLLECTIONS,
    dropdown: true,
    cardType: `collection-card`,
  },
  {
    label: `SHOP BY NEED`,
    value: `shop_by_need`,
    featured: SHOP_BY_NEED,
    dropdown: true,
    cardType: `collection-card`,
  },
  {
    label: `NEW: ORIGINAL CHAI`,
    value: `new_original_chai`,
    featured: [
      {
        name: `The Original Chai`,
        href: `/products/original-chai`,
        imageSrc: `${ASSETS.NEW_LAUNCH}/original-chai.png`,
        newLaunch: true,
        description: `Original Chai is a premium Chai prepared with Gently Rolled Aromatic CTC leaves. Made by a special process, it is a rich, creamy & aromatic doodh Chai. `,
      },
    ],
    dropdown: true,
    cardType: `rectangle-card`,
  },
  {
    label: `EXPERIENCE`,
    value: `experience`,
    openInNewTab: true,
    link: `${APP_CONSTATNTS.SHOPYFY_URL}/pages/our-farms`,
    dropdown: false,
  },
  {
    label: `LEARN MORE`,
    value: `learn_more`,
    link: '/about-us',
    dropdown: false,
  },
];

export default MENU_ITEMS;
