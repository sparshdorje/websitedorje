import COLLECTIONS from './Collections';
import NEWLY_LAUNCHED from './NewlyLaunched';
import SHOP_BY_NEED from './ShopByNeed';
import { APP_CONSTATNTS } from './index';

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
    label: `NEWLY LAUNCHED`,
    value: `new_original_chai`,
    featured: NEWLY_LAUNCHED,
    dropdown: true,
    cardType: `rectangle-card`,
  },
  // {
  //   label: `EXPERIENCE`,
  //   value: `experience`,
  //   openInNewTab: true,
  //   link: `${APP_CONSTATNTS.SHOPYFY_URL}/pages/our-farms`,
  //   dropdown: false,
  // },
  {
    label: `LEARN MORE`,
    value: `learn_more`,
    link: '/about-us',
    dropdown: false,
  },
];

export default MENU_ITEMS;
