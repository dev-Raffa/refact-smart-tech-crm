import { Briefcase, Landmark } from 'lucide-react';

type CltTagsProps = {
  leadProducts: string[];
  approvedBank: string | null | undefined;
};

export function CltTags({ leadProducts, approvedBank }: CltTagsProps) {
  const removeBankPrefix = (text?: string | null) => {
    if (!text || text === 'None') return null;
    return text.replace(/^Banco\s+/, '');
  };

  const products = leadProducts.join(', ');
  const bank = removeBankPrefix(approvedBank);

  return (
    <div className="w-full space-y-1.5">
      <p className="text-[11px] leading-tight flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 w-full min-w-0">
        <Briefcase className="h-3 w-3 flex-shrink-0" />
        <span className="truncate flex-1 min-w-0">
          Produtos:{' '}
          <strong className="font-medium text-zinc-900 dark:text-zinc-100">
            {products.toUpperCase()}
          </strong>
        </span>
      </p>
      {bank && (
        <p className="text-[11px] leading-tight flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 w-full min-w-0">
          <Landmark className="h-3 w-3 flex-shrink-0" />
          <span className="truncate flex-1 min-w-0">
            Banco:{' '}
            <strong className="font-medium text-zinc-900 dark:text-zinc-100">
              {bank}
            </strong>
          </span>
        </p>
      )}
    </div>
  );
}
