import { httpClient } from '@/infra/api/gateway-api';
import type { GetUploadedFilesResponseDTO } from '../types/import.dto';
import type { PaginatedImports, UploadFileParams } from '../types/import.model';
import { ImportMapper } from './mapper';
import { handleImportError } from './error-handler';

export async function getFiles(): Promise<PaginatedImports> {
  try {
    const { data } = await httpClient.get<GetUploadedFilesResponseDTO>(
      `/files?PageFilter.Page=1&PageFilter.PageSize=500`,
    );
    return ImportMapper.toPaginatedImports(data);
  } catch (error) {
    handleImportError(error, 'getFiles');
  }
}

export async function uploadFile({ file, type }: UploadFileParams): Promise<void> {
  try {
    const formData = new FormData();
    
    formData.append('File', file);
    formData.append('Type', type);

    await httpClient.post(
      '/files/import',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
  } catch (error) {
    handleImportError(error, 'uploadFile');
  }
}
