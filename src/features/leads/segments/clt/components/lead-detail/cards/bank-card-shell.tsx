import type { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import { cn } from '@/shared/utils';
import { Landmark } from 'lucide-react';

type BankCardShellProps = {
  bankName: string;
  badge: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function BankCardShell({
  bankName,
  badge,
  footer,
  children
}: BankCardShellProps) {
  return (
    <Card
      className={cn(
        'h-full flex flex-col justify-between transition-all duration-300 rounded-md shadow-none',
        'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900'
      )}
    >
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center justify-center gap-2">
            <div className="rounded-full bg-red-800 p-1 size-9 flex items-center justify-center">
              <Landmark className="size-5 text-white" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Banco
              </span>
              <CardTitle className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-none">
                {bankName}
              </CardTitle>
            </div>
          </div>
          {badge}
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-2 flex-grow">
        <div className="space-y-4">{children}</div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-3 flex flex-col gap-2">
        {footer}
      </CardFooter>
    </Card>
  );
}
