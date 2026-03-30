import { Card } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function CustomersSkeleton() {
  return (
    <div className="w-full">
      <Card className="mt-4 flex flex-col space-y-3 border-x-0">
        <div className="flex justify-between items-center py-6 px-4">
          <Skeleton className="w-1/4 h-4" />
          <Skeleton className="w-1/6 h-4" />
          <Skeleton className="w-1/6 h-4" />
          <Skeleton className="w-1/6 h-4" />
          <Skeleton className="w-1/6 h-4" />
        </div>
        <Separator />
        <div className="flex flex-col space-y-5 p-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-3" />
          ))}
        </div>
      </Card>

      <div className="flex justify-between items-center py-4 pl-8 pr-4">
        <Skeleton className="w-96 h-4" />
        <div className="flex items-center space-x-4">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
    </div>
  );
}
