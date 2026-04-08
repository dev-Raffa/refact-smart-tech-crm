import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import type { FileWithPreview } from '@/shared/components/common/file-picker/types';

import {
  useCreateInssLeadMutation,
  useUploadLeadDocumentMutation
} from '../../../hooks/use-mutations';

const inssManualLeadFormSchema = z
  .object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    cpf: z.string().min(1, 'CPF é obrigatório'),
    phoneNumber: z.string().min(1, 'Telefone é obrigatório'),
    orgao: z.string().min(1, 'Órgão é obrigatório'),
    prefeitura: z.string().optional(),
    estado: z.string().optional(),
    contraCheque: z.array(z.any()).optional(),
    operator: z.object({
      id: z.string().min(1, 'Operador é obrigatório'),
      name: z.string().min(1, 'Operador é obrigatório'),
      username: z.string().min(1, 'Operador é obrigatório')
    })
  })
  .superRefine((data, ctx) => {
    if (
      (data.orgao === 'Estadual' || data.orgao === 'Federal') &&
      (!data.estado || data.estado.trim() === '')
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Estado é obrigatório',
        path: ['estado']
      });
    }
    if (
      data.orgao === 'Municipal' &&
      (!data.prefeitura || data.prefeitura.trim() === '')
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Prefeitura é obrigatório',
        path: ['prefeitura']
      });
    }
  });

export type InssManualLeadFormValues = z.infer<typeof inssManualLeadFormSchema>;

export function useCreateLeadForm(onSuccess?: () => void) {
  const { mutateAsync: createLead, isPending: isCreating } =
    useCreateInssLeadMutation();
  const { mutateAsync: uploadDocument, isPending: isUploading } =
    useUploadLeadDocumentMutation();

  const form = useForm<InssManualLeadFormValues>({
    resolver: zodResolver(inssManualLeadFormSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      phoneNumber: '',
      orgao: '',
      prefeitura: '',
      estado: '',
      contraCheque: []
    }
  });

  const onSubmit = async (values: InssManualLeadFormValues) => {
    const fileWithPreview = values.contraCheque?.[0] as FileWithPreview;
    const file = fileWithPreview.file;

    try {
      const leadId = await createLead({
        name: values.nome,
        cpf: values.cpf,
        phoneNumber: values.phoneNumber,
        servantInformation: {
          governmentLevel: values.orgao,
          cityHall: values.prefeitura || '',
          state: values.estado || ''
        },
        product: 'Inss',
        stageName: 'NewLead',
        operator: values.operator
      });

      if (leadId) {
        await uploadDocument({
          leadId,
          file: file as File
        });

        toast.success('Lead criado com sucesso!');
        form.reset();
        onSuccess?.();
      }
    } catch (error) {
      console.error('Erro ao criar lead:', error);
      // O erro já é tratado pelo interceptor/mutation meta geralmente,
      // mas mantemos o log aqui para debug.
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: isCreating || isUploading
  };
}
