import { useState } from 'react';
import { DownloadCloud } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';
import { useExportCustomersMutation } from '../../hooks/use-mutations';

interface ExportCustomersDialogProps {
  filters: any;
  totalResults: number;
}

export function ExportCustomersDialog({
  filters,
  totalResults
}: ExportCustomersDialogProps) {
  const { mutateAsync, isPending } = useExportCustomersMutation();
  const [open, setOpen] = useState(false);

  const handleExport = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await mutateAsync(filters);
      setOpen(false);
    } catch {
      // Errors handled gracefully by global Query handler
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2"
          disabled={totalResults === 0}
        >
          <DownloadCloud className="h-4 w-4" />
          Exportar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Exportar Clientes</AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a exportar <strong>{totalResults}</strong>{' '}
            cliente(s) para um arquivo Excel com base nos filtros atuais. A
            exportação será processada pelo servidor. Deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleExport} disabled={isPending}>
            {isPending ? 'Solicitando...' : 'Confirmar Exportação'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
