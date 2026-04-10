import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { unmaskMoney, unmaskPercent } from '@/shared/utils';

import { useLeadsBoardContext } from '@/features/leads/hooks/use-leads-board-context';
import { CreateCltLeadSchema, type CreateCltLead } from '../../../types/models';
import { useCreateCltLeadMutation } from '../../../hooks/use-mutation';

export const useCreateCltLeadSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { availableOperators } = useLeadsBoardContext();
  const createLeadMutation = useCreateCltLeadMutation();

  const form = useForm<CreateCltLead>({
    resolver: zodResolver(CreateCltLeadSchema),
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

  const onSubmit = (data: CreateCltLead) => {
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
