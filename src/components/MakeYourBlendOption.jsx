import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const ICONS = {
  //Base Tea

  'Green Tea': '/assets/make-your-own-blend/base-tea/green-tea.webp',
  'Black Tea': '/assets/make-your-own-blend/base-tea/black-tea.webp',

  //Primary Flavour
  Chamomile: '/assets/make-your-own-blend/primary-flavour/chamomile.webp',
  Jasmine: '/assets/make-your-own-blend/primary-flavour/jasmine.webp',
  Hibiscus: '/assets/make-your-own-blend/primary-flavour/hibiscus.webp',
  'Blue Pea': '/assets/make-your-own-blend/primary-flavour/blue-pea.webp',
  Lavender: '/assets/make-your-own-blend/primary-flavour/lavender.webp',
  Rose: '/assets/make-your-own-blend/primary-flavour/rose.webp',
  Orange: '/assets/make-your-own-blend/primary-flavour/orange-peel.webp',
  Lemon: '/assets/make-your-own-blend/primary-flavour/gondhoraj-lemon.webp',
  Marigold: '/assets/make-your-own-blend/primary-flavour/marigold.webp',

  //HERBS AND SPICES
  'Star Anise': '/assets/make-your-own-blend/herbs-and-spices/star-anise.webp',
  Cinnamon: '/assets/make-your-own-blend/herbs-and-spices/cinnamon.webp',
  Saffron: '/assets/make-your-own-blend/herbs-and-spices/saffron.webp',
  Ginger: '/assets/make-your-own-blend/herbs-and-spices/ginger.webp',
  Cardamom: '/assets/make-your-own-blend/herbs-and-spices/green-cardamom.webp',
  Mint: '/assets/make-your-own-blend/herbs-and-spices/peppermint.webp',
  Stevia: '/assets/make-your-own-blend/herbs-and-spices/stevia.webp',
  Spearmint: '/assets/make-your-own-blend/herbs-and-spices/spearmint.webp',
};

const MakeYourBlendOption = ({ name, handleSelect, selected }) => {
  return (
    <div
      onClick={() => handleSelect(name)}
      className={cn(
        'bg-white w-[30%] lg:w-[160px] relative rounded-md h-[130px] lg:h-[160px] p-2 gap-3 flex flex-col items-center lg:justify-center cursor-pointer',
        selected && 'border-2 border-secondary'
      )}
    >
      {selected && (
        <Image
          loading="eager"
          src={'/assets/icons/check-circle.png'}
          height={100}
          width={100}
          className="h-8 w-8 absolute -top-3 -right-3 object-contain"
        />
      )}

      <div className="w-[75px] h-[75px] rounded-full overflow-hidden">
        <Image
          height={100}
          width={100}
          src={ICONS[name]}
          alt={name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="font-fraunces font-semibold text-sm text-primary">
        {name}
      </div>
    </div>
  );
};

export default MakeYourBlendOption;
