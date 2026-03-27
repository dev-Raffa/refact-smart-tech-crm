import { httpClient } from '@/infra/api/gateway-api';
import type { GetCustomersResponseDTO } from '../types/customer.dto';
import type { Customer, PaginatedCustomers, GetCustomersParams, ExportCustomersParams } from '../types/customer.model';
import { CustomerMapper } from './mapper';
import { handleCustomerError } from './error-handler';

export async function getCustomers(params?: GetCustomersParams): Promise<PaginatedCustomers> {
  try {
    const queryParams = params ? CustomerMapper.toGetCustomersQueryParams(params) : undefined;

    const { data } = await httpClient.get<GetCustomersResponseDTO>('/customers', {
      params: queryParams,
    });

    return CustomerMapper.toPaginatedModel(data);
  } catch (error) {
    handleCustomerError(error, 'getCustomers');
  }
}

export async function createCustomer(model: Partial<Customer>): Promise<Customer> {
  try {
    const dto = CustomerMapper.toDTO(model as Customer);
    const { data } = await httpClient.post('/customers', dto);
    return CustomerMapper.toModel(data);
  } catch (error) {
    handleCustomerError(error, 'createCustomer');
  }
}

export async function updateCustomer(id: string, model: Partial<Customer>): Promise<Customer> {
  try {
    const dto = CustomerMapper.toDTO(model as Customer);
    const { data } = await httpClient.post('/customers', { ...dto, id });
    return CustomerMapper.toModel(data);
  } catch (error) {
    handleCustomerError(error, 'updateCustomer');
  }
}

export async function deleteCustomer(id: string): Promise<void> {
  try {
    await httpClient.delete(`/customers/${id}`);
  } catch (error) {
    handleCustomerError(error, 'deleteCustomer');
  }
}

export async function exportCustomers(params: ExportCustomersParams): Promise<void> {
  try {
    const requestDTO = CustomerMapper.toExportCustomersDTO(params);
    
    await httpClient.post('/customers/export', requestDTO);
  } catch (error) {
    handleCustomerError(error, 'exportCustomers');
  }
}
