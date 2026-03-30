import { AxiosError } from 'axios';

export function handleCustomerError(
  error: Error | unknown,
  action: string
): never {
  console.error(`Erro em Customer Service [${action}]:`, error);

  let message = 'Ocorreu um erro inesperado na operação.';

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const apiMessage = error.response?.data?.message;

    switch (status) {
      case 400:
        message = apiMessage || 'Dados inválidos para esta operação.';
        break;
      case 401:
        message = apiMessage || 'Sessão expirada. Faça login novamente.';
        break;
      case 403:
        message = 'Você não tem permissão para realizar esta ação.';
        break;
      case 404:
        message = apiMessage || 'Cliente não encontrado.';
        break;
      case 409:
        message = apiMessage || 'Conflito: o registro já existe.';
        break;
      case 500:
      case 502:
      case 503:
        message = 'Erro interno no servidor. Tente novamente mais tarde.';
        break;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  throw new Error(message);
}
