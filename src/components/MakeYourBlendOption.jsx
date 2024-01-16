import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ICONS } from '../config/MakeYourBlend';

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
          alt="check"
          className="h-8 w-8 absolute -top-3 -right-3 object-contain"
        />
      )}

      <div className="w-[75px] h-[75px] rounded-full overflow-hidden">
        <Image
          loading="eager"
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
