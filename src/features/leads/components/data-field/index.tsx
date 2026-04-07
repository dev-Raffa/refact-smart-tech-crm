import { CopyButton } from '@/shared/components/global/copy-button';

export function DataField({
  label,
  value,
  copyValue,
  copySuccessText,
  renderValue
}: {
  label: string;
  value?: string | null;
  copyValue?: string | null;
  copySuccessText?: string;
  renderValue?: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] text-zinc-500 uppercase tracking-wide font-medium">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {renderValue ? (
          renderValue
        ) : (
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 truncate">
            {value || 'Não informado'}
          </p>
        )}
        {copyValue && value && value !== 'Não informado' && (
          <CopyButton
            copy={copyValue}
            successText={copySuccessText || 'Copiado!'}
            errorText="Falha ao copiar"
          />
        )}
      </div>
    </div>
  );
}
