export function StatBox({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 p-2 rounded bg-zinc-50 dark:bg-zinc-800/50 border border-transparent shadow-none">
      <div className="flex items-center gap-1 text-muted-foreground">
        {icon}
        <span className="text-[9px] font-medium uppercase">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
        {value}
      </span>
    </div>
  );
}
