export type ImportStatus = 'Concluded' | 'InProgress' | 'Failed';

export type ImportFileType = 'Customer' | 'Government';

export interface ImportedFileUser {
  id?: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface ImportedFile {
  id?: string;
  user: ImportedFileUser;
  importedAt: string;
  fileType: string;
  status: ImportStatus;
  filePath: string;
  totalRows: number;
  totalRowsImported: number;
  totalRowsNotImported: number;
  totalCustomerUpdated: number;
}

export interface PaginatedImports {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
  items: ImportedFile[];
}

export interface UploadFileParams {
  file: File;
  type: ImportFileType;
}
