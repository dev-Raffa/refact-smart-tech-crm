import { cn } from '@/shared/utils';
import type { ReactNode } from 'react';

interface IBoardEmptyProps {
  message?: string;
  icon?: ReactNode;
  className?: string;
}

export function BoardEmpty({ message = 'Nenhum item encontrado.', icon, className }: IBoardEmptyProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground', className)}>
      {icon && <div className="opacity-40">{icon}</div>}
      <p className="text-sm">{message}</p>
    </div>
  );
}
