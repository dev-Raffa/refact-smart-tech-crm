export function StatField({
  label,
  value,
  highlight = false
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-tight">
        {label}
      </span>
      <p
        className={`text-sm font-bold ${highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-800 dark:text-zinc-200'}`}
      >
        {value}
      </p>
    </div>
  );
}
