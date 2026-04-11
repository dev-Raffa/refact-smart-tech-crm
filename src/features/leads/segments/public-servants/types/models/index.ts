import type { Lead } from '@/features/leads/types/lead.model';
import { z } from 'zod';

export const CreatePublicServantLeadSchema = z
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

export type CreatePublicServantLead = z.infer<
  typeof CreatePublicServantLeadSchema
>;

export interface LeadPublicServantDetails {
  governamentLevel?: string;
  cityHall?: string;
  state?: string;
}

export interface PublicServantLead extends Lead {
  publicServantDetails: LeadPublicServantDetails;
}
