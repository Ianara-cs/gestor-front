export const formatErrorMessage = (error: any): string => {
  if (error?.graphQLErrors?.length) {
    return error.graphQLErrors
      .map((err: any) => err.extensions?.originalError?.message[0] || err.message)
      .join(', ')
  }
  if (error?.networkError) {
    return 'Erro de conexão com o servidor. Tente novamente mais tarde.'
  }
  return error?.message || 'Ocorreu um erro inesperado.'
}
