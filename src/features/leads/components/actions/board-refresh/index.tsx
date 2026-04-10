import { useQueryClient, useIsFetching } from '@tanstack/react-query';
import { Button } from '@/shared/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/shared/utils';

export function BoardRefreshControl() {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({ queryKey: ['leads'] });
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (
        event.type === 'updated' &&
        Array.isArray(event.query.queryKey) &&
        event.query.queryKey[0] === 'leads' &&
        event.query.state.status === 'success'
      ) {
        const timestamp = event.query.state.dataUpdatedAt;
        if (timestamp > 0) {
          setLastUpdated((prev) => Math.max(prev, timestamp));
        }
      }
    });

    const leadsQueries = queryClient
      .getQueryCache()
      .findAll({ queryKey: ['leads'] });
    const latest = Math.max(
      ...leadsQueries.map((q) => q.state.dataUpdatedAt),
      0
    );
    if (latest > 0) {
      setLastUpdated(latest);
    }

    return () => unsubscribe();
  }, [queryClient]);

  const handleRefresh = () => {
    void queryClient.invalidateQueries({ queryKey: ['leads'] });
  };

  return (
    <div className="pl-4 flex items-center gap-2">
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium leading-none text-muted-foreground uppercase ">
          Última atualização
        </span>
        <span className="text-xs font-bold tabular-nums text-foreground/80">
          {format(lastUpdated, 'HH:mm:ss', { locale: ptBR })}
        </span>
      </div>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={handleRefresh}
        disabled={isFetching > 0}
        className="size-4 rounded-full shadow-sm hover:bg-accent/50 transition-all active:scale-95"
        title="Atualizar board"
      >
        <RefreshCcw
          className={cn(
            'size-3.5 text-muted-foreground transition-all',
            isFetching > 0 && 'animate-spin text-primary'
          )}
        />
      </Button>
    </div>
  );
}
