export function DataField({
  label,
  value,
  primary = false
}: {
  label: string;
  value?: string;
  primary?: boolean;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-tight">
        {label}
      </span>
      <p
        className={`text-xs ${primary ? 'font-bold text-red-700 dark:text-red-500' : 'font-semibold text-zinc-700 dark:text-zinc-300'}`}
      >
        {value || 'Não informado'}
      </p>
    </div>
  );
}
