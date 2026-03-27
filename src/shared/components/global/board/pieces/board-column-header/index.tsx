import { cn } from '@/shared/utils';
import type { IBoardColumnHeader } from '../../types';

export function BoardColumnHeader({ title, count, badge, className }: IBoardColumnHeader) {
  return (
    <div className={cn('flex items-center justify-between px-3 py-2 border-b', className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold tracking-tight truncate">{title}</span>
        {badge}
      </div>
      {count !== undefined && (
        <span className="text-xs font-medium text-muted-foreground bg-muted rounded-full px-2 py-0.5 min-w-[1.5rem] text-center">
          {count}
        </span>
      )}
    </div>
  );
}
