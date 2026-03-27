import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import {
  Building2Icon,
  ChevronDownIcon,
  FileCheckIcon,
  UsersIcon,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { CUSTOMERS_CSV, AGREEMENT_CSV } from '@/features/imports/consts/templates';
import { downloadCsv } from '@/features/imports/utils/dowload-csv';

export function UploadFileTemplate() {
  return (
    <Card className="h-56 w-full flex justify-center items-center p-6 border-dashed sm:h-48 xl:max-w-md">
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-foreground">
          <FileCheckIcon className="size-6 text-background" />
        </div>

        <div className="grid grid-cols-1 items-center gap-1">
          <h5 className="text-center font-medium">Template de arquivo</h5>
          <p className="text-sm text-center text-muted-foreground sm:text-start">
            Arquivo CSV de exemplo para seus uploads.
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" size="sm" className="h-8 flex items-center gap-1 text-xs tracking-wide w-3xs">
              Escolha o template
              <ChevronDownIcon className="size-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-3xs">
            <div className="w-full grid gap-4">
              <div className="grid grid-cols-1 items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-xs px-2"
                  onClick={() => downloadCsv(CUSTOMERS_CSV, 'template-clientes.csv')}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <UsersIcon className="size-4" />
                    Template de Clientes
                  </span>
                </Button>
              </div>
              <div className="grid grid-cols-1 items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-xs"
                  onClick={() => downloadCsv(AGREEMENT_CSV, 'template-convenio.csv')}
                >
                  <span className="flex items-center gap-2 text-sm font-medium px-2">
                    <Building2Icon className="size-4" />
                    Template Convênio
                  </span>
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
}
