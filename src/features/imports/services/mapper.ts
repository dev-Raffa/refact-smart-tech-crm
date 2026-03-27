import type { UploadedFileDTO, GetUploadedFilesResponseDTO } from '../types/import.dto';
import type { ImportedFile, PaginatedImports } from '../types/import.model';

export class ImportMapper {
  public static toModel(dto: UploadedFileDTO): ImportedFile {
    return {
      id: dto.id,
      user: {
        id: dto.user?.id,
        username: dto.user?.username ?? '',
        firstName: dto.user?.firstName,
        lastName: dto.user?.lastName,
      },
      importedAt: dto.importedAt,
      fileType: dto.fileType,
      status: dto.fileStatus,
      filePath: dto.filePath,
      totalRows: dto.totalRows ?? 0,
      totalRowsImported: dto.totalRowsImported ?? 0,
      totalRowsNotImported: dto.totalRowsNotImported ?? 0,
      totalCustomerUpdated: dto.totalCustomerUpdated ?? 0,
    };
  }

  public static toModelList(dtos: UploadedFileDTO[]): ImportedFile[] {
    return dtos.map(ImportMapper.toModel);
  }

  public static toPaginatedImports(response: GetUploadedFilesResponseDTO): PaginatedImports {
    return {
      pageNumber: response.pageNumber,
      pageSize: response.pageSize,
      totalPages: response.totalPages,
      totalResults: response.totalResults,
      items: ImportMapper.toModelList(response.results ?? []),
    };
  }
}
