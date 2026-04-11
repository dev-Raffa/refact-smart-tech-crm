import type { Lead } from '@/features/leads/types/lead.model';
import { z } from 'zod';

export const CreateCltLeadSchema = z.object({
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

export type CreateCltLead = z.infer<typeof CreateCltLeadSchema>;

export interface ApprovedBank {
  id: string;
  name: string;
  installmentTerm: number;
  releasedAmount: number;
  installmentAmount: number;
  interestRate: number;
  proposalNumber?: string;
}

export interface FailedBank {
  bankFailed: string;
  reasons: string[];
}

export interface LeadCltCompany {
  name: string;
  cnpj: string;
  admissionDate: string;
  salary: number;
  registration?: string;
  foundationDate?: string;
  workersCount?: number;
  cnaeCode?: string;
  cnaeDescription?: string;
}

export interface LeadCltDetails {
  companies: LeadCltCompany[];
  eligible: boolean;
  employmentStartDate?: string;
  employmentDuration?: number;
  marginAvailable?: number;
  totalEarnings?: number;
}

export interface OfferInformation {
  proposalNumber?: string;
  releasedAmount?: number;
  installmentAmount?: number;
  interestRate?: number;
  installmentTerm?: number;
  signatureAmount?: number;
  paid?: boolean;
  approvedBanks?: ApprovedBank[];
  failedBanks?: FailedBank[];
}

export interface ProductOfferInformation {
  fgts?: OfferInformation;
  clt?: OfferInformation;
  pix?: OfferInformation;
  cas?: OfferInformation;
  crefaz?: OfferInformation;
}

export interface CltLead extends Lead {
  products: string[];
  approvedBank?: string | null;
}
