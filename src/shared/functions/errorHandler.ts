const translateErrorMessage = (message: string): string => {
  if (/network/i.test(message)) return 'Erro de conexão com o servidor. Tente novamente mais tarde.'
  if (/unauthorized/i.test(message)) return 'Você não tem permissão para realizar esta ação.'
  if (/invalid/i.test(message) && /credentials/i.test(message)) return 'Credenciais inválidas. Verifique seu usuário e senha.'
  if (/not found/i.test(message)) return 'Recurso não encontrado.'
  if (/exists/i.test(message)) return 'Já existe um registro com esses dados.'
  if (/Undeletable/i.test(message)) return 'Não pode ser excluído, pois há recursos vinculados.'
  return 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
}


export const formatErrorMessage = (error: any): string => {
  if (error?.graphQLErrors?.length) {
    return error.graphQLErrors
      .map((err: any) => translateErrorMessage(err.message))
      .join(', ')
  }
  if (error?.networkError) {
    return 'Erro de conexão com o servidor. Tente novamente mais tarde.'
  }
  return error?.message || 'Ocorreu um erro inesperado.'
}
