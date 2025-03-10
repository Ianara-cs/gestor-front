export interface DataPaginate<TData> {
  result: TData
  hasNextPage: boolean
  total: number
}

export function isDataPaginate<TData>(data: any): data is DataPaginate<TData> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'result' in data &&
    'hasNextPage' in data &&
    'total' in data
  )
}
