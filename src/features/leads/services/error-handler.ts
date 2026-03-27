import { AxiosError } from 'axios';

export function handleLeadError(error: Error | unknown, action: string): never {
  console.error(`Erro em Lead Service [${action}]:`, error);

  let message = 'Ocorreu um erro inesperado na operação.';

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const apiMessage = error.response?.data?.message;

    switch (status) {
      case 400:
        message = apiMessage || 'Dados inválidos para esta operação.';
        break;
      case 403:
        message = 'Você não tem permissão para realizar esta ação.';
        break;
      case 404:
        message = apiMessage || 'Lead não encontrado.';
        break;
      case 409:
        message = apiMessage || 'Conflito: o registro já existe.';
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
