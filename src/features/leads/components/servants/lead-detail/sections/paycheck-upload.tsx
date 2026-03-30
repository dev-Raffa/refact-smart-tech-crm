import { useState } from 'react';
import { FileIcon, Loader2, Upload } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  FilePicker,
  FilePickerButton,
  FilePickerContent,
  FilePickerDrag,
  FilePickerEmpty,
  FilePickerError,
  FilePickerInput
} from '@/shared/components/global/file-picker';

import { useUploadLeadDocumentMutation } from '../../../../hooks/use-mutations';
import type { FileWithPreview } from '@/shared/components/global/file-picker/types';

export function PaycheckUploadSection({ leadId }: { leadId: string }) {
  const { mutateAsync, isPending } = useUploadLeadDocumentMutation();
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleUploadContracheque = async () => {
    if (!files || !files[0]?.file) return;
    await mutateAsync({
      leadId,
      file: files[0].file as File
    });
  };

  return (
    <div className="mt-2 space-y-4">
      <FilePicker
        files={files}
        onFilesChange={setFiles}
        maxFiles={1}
        maxSizeMB={10}
        accept=".pdf"
      >
        <FilePickerInput />
        <FilePickerDrag className="bg-zinc-50 border-dashed dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <FilePickerEmpty>
            <div className="mb-2 flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <FileIcon className="size-4 text-emerald-600" />
            </div>
            <p className="mb-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Solte o arquivo aqui
            </p>
            <p className="text-[11px] text-muted-foreground mb-3 font-medium">
              Apenas .PDF até 10MB
            </p>
            <FilePickerButton label="Procurar arquivo" />
          </FilePickerEmpty>
          <FilePickerContent />
          <FilePickerError />
        </FilePickerDrag>
      </FilePicker>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleUploadContracheque}
          disabled={isPending || files.length === 0}
          className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto shadow-none"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" /> Enviar
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
