import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUploadFileMutation } from '../../hooks/use-mutations';
import type { ImportFileType } from '../../types/import.model';
import type { FileWithPreview } from '@/shared/components/common/file-picker/types';

export const importsFormSchema = z.object({
  fileType: z.enum(['Customer', 'Government'] as const, {
    error: 'Selecione o tipo de arquivo'
  }),
  files: z
    .array(z.custom<FileWithPreview>())
    .min(1, 'Selecione ao menos um arquivo')
});

export type ImportsFormValues = z.infer<typeof importsFormSchema>;

export function useImportsForm() {
  const { mutate: uploadFile, isPending: isUploading } =
    useUploadFileMutation();

  const form = useForm<ImportsFormValues>({
    resolver: zodResolver(importsFormSchema),
    defaultValues: {
      files: []
    }
  });

  const onSubmit = (data: ImportsFormValues) => {
    const selectedFile = data.files[0]?.file;
    if (selectedFile instanceof File) {
      uploadFile(
        { file: selectedFile, type: data.fileType as ImportFileType },
        {
          onSuccess: () => {
            form.reset();
          }
        }
      );
    }
  };

  const isFormValid = form.watch('files').length > 0;
  const fileType = form.watch('fileType');
  const files = form.watch('files');

  useEffect(() => {
    if (files.length > 0) {
      form.handleSubmit(onSubmit)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return {
    form,
    isUploading,
    isFormValid,
    fileType,
    onSubmit: form.handleSubmit(onSubmit)
  };
}
