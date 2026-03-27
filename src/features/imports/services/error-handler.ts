import { AxiosError } from 'axios';

export function handleImportError(error: unknown, action: string): never {
  console.error(`[imports] Erro em [${action}]:`, error);

  let message = 'Ocorreu um erro inesperado na operação de importação.';

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const apiMessage = error.response?.data?.message as string | undefined;

    switch (status) {
      case 400:
        message = apiMessage || 'Dados inválidos para esta operação.';
        break;
      case 403:
        message = 'Você não tem permissão para realizar esta ação.';
        break;
      case 404:
        message = apiMessage || 'Arquivo não encontrado.';
        break;
      case 413:
        message = 'O arquivo é muito grande. Envie um arquivo menor.';
        break;
      case 500:
        message = 'Erro interno no servidor. Tente novamente mais tarde.';
        break;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  throw new Error(message);
}
