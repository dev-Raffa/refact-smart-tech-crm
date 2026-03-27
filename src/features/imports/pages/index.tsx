import { PageHeader } from '@/shared/components/global/page-header';
import { UploadContent } from '../components/upload-content';

export function ImportsPage() {
  return (
    <>
      <PageHeader title="Importações" />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
        <div className="flex flex-col gap-2 pb-2">
          <h2 className="text-2xl font-semibold">Minhas importações</h2>
          <p className="text-muted-foreground">
            Seus arquivos importados no sistema para sua operação.
          </p>
        </div>

        <UploadContent />
      </div>
    </>
  );
}
