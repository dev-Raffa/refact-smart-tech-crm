import { Download } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useLeadPaySlipUrlQuery } from '../../../hooks/use-queries';

export const PaycheckDownloadSection = ({ leadId }: { leadId: string }) => {
  const { data: paySlipUrl, isPending } = useLeadPaySlipUrlQuery(leadId);

  const handleDownloadPaycheck = () => {
    if (paySlipUrl) {
      window.open(paySlipUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        Faça o download do último contracheque disponível para o cliente.
      </p>
      <Button
        onClick={handleDownloadPaycheck}
        disabled={isPending}
        className="w-full"
        variant="outline"
      >
        <Download className="mr-2 h-4 w-4" />
        Baixar contracheque
      </Button>
    </div>
  );
};
