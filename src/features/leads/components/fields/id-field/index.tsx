import { CopyButton } from '@/shared/components/common/copy-button';

export function IdField({
  label,
  value,
  copySuccessText
}: {
  label: string;
  value?: string;
  copySuccessText: string;
}) {
  return (
    <div className="space-y-1.5 pt-3 first:pt-0 border-t first:border-t-0 border-zinc-50 dark:border-zinc-900">
      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">
        {label}
      </span>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400 break-all leading-none">
          {value || 'Não informado'}
        </p>
        {value && (
          <CopyButton
            copy={value}
            successText={copySuccessText}
            errorText="Falha ao copiar ID"
          />
        )}
      </div>
    </div>
  );
}
