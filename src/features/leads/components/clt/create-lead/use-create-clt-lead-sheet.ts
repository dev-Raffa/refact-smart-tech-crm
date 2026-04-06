import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateCltLeadMutation } from '../../../hooks/use-mutations';
import { useLeadsBoardContext } from '../../../hooks/use-leads-board-context';
import { unmaskMoney, unmaskPercent } from '@/shared/utils';

export const createCltLeadSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(11, 'CPF inválido'),
  phoneNumber: z.string().min(10, 'Telefone inválido'),
  installmentTerm: z.number().min(1, 'Prazo inválido'),
  installmentAmount: z.number().min(1, 'Valor da parcela inválido'),
  interestRate: z.number().min(0, 'Taxa de juros inválida'),
  bank: z.string().min(1, 'Banco é obrigatório'),
  operator: z.object({
    id: z.string().min(1, 'Operador é obrigatório'),
    name: z.string(),
    username: z.string()
  })
});

export type CreateCltLeadSchemaType = z.infer<typeof createCltLeadSchema>;

export const useCreateCltLeadSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { availableOperators } = useLeadsBoardContext();
  const createLeadMutation = useCreateCltLeadMutation();

  const form = useForm<CreateCltLeadSchemaType>({
    resolver: zodResolver(createCltLeadSchema),
    defaultValues: {
      name: '',
      cpf: '',
      phoneNumber: '',
      installmentTerm: undefined,
      installmentAmount: undefined,
      interestRate: undefined,
      bank: '',
      operator: undefined
    }
  });

  const onSubmit = (data: CreateCltLeadSchemaType) => {
    createLeadMutation.mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      }
    });
  };

  return {
    isOpen,
    setIsOpen,
    form,
    onSubmit,
    availableOperators,
    isPending: createLeadMutation.isPending,
    parseMoney: unmaskMoney,
    parsePercent: unmaskPercent
  };
};
