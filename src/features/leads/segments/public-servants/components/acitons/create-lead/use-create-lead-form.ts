import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  CreatePublicServantLeadSchema,
  type CreatePublicServantLead
} from '../../../types/models';
import { useCreatePublicServantLeadMutation } from '../../../hooks/use-mutations';

export function useCreateLeadForm() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createLead, isPending: isCreating } =
    useCreatePublicServantLeadMutation();

  const form = useForm<CreatePublicServantLead>({
    resolver: zodResolver(CreatePublicServantLeadSchema),
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

  const onSubmit = async (data: CreatePublicServantLead) => {
    await createLead(data);
    form.reset();
    setOpen(false);
  };

  return {
    form,
    isSubmitting: isCreating,
    open,
    setOpen,
    onSubmit: form.handleSubmit(onSubmit)
  };
}
