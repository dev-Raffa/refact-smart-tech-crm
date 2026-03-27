export type ImportFileStatus = 'Concluded' | 'InProgress' | 'Failed';

export type FileUploadType = 'Customer' | 'Government';

export interface FileUploadRequestDTO {
  File: File;
  Type: FileUploadType;
}

export interface UploadedFileUserDTO {
  id?: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface UploadedFileDTO {
  id?: string;
  user: UploadedFileUserDTO;
  importedAt: string;
  fileType: string;
  fileStatus: ImportFileStatus;
  filePath: string;
  totalRows: number;
  totalRowsImported: number;
  totalRowsNotImported: number;
  totalCustomerUpdated: number;
}

export interface GetUploadedFilesResponseDTO {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
  totalAmount: number;
  results: UploadedFileDTO[];
}
