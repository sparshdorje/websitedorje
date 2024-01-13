import { Skeleton } from '@/components/ui/skeleton';

export const BestSellerCardSkeleton = () => {
  return (
    <div className="flex flex-col items-start overflow-hidden pb-2 rounded-2xl min-w-[300px] w-[300px] h-[440px] bg-white">
      <div className="h-[180px] w-full mb-3">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="px-3 w-full mb-3">
        <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
        <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      </div>

      <div className="px-3 w-full">
        <Skeleton className="mt-2 h-4 rounded-lg" />
        <Skeleton className="mt-2 h-4 rounded-lg" />
        <Skeleton className="mt-2 h-4 rounded-lg" />
        <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      </div>

      <div className="px-3 mt-auto w-full">
        <Skeleton className="h-10 rounded-full" />
      </div>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col relative items-start shadow-md justify-between p-4 rounded-2xl min-w-[300px] w-[300px] h-[480px] bg-white gap-2">
      <div className="h-[200px] w-full rounded-lg">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="px-3 w-full mb-3">
        <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
        <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      </div>

      <div className="px-3 w-full">
        <Skeleton className="mt-2 h-4 rounded-lg" />
        <Skeleton className="mt-2 h-4 rounded-lg" />
        <Skeleton className="mt-2 h-4 rounded-lg" />
        <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      </div>

      <div className="px-3 mt-auto w-full">
        <Skeleton className="h-10 rounded-md" />
      </div>
    </div>
  );
};
