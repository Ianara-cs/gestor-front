import { DocumentNode, OperationVariables, useLazyQuery } from '@apollo/client'
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer'
import { formatErrorMessage } from '../functions/errorHandler'
import { useEffect } from 'react'
import { isDataPaginate } from '../types/typeGuard/isDataPaginate'

interface useGraphQLQueryProps<TData> {
  query: DocumentNode
  isPaginate?: boolean
  saveGlobal?: (object: TData) => void
}

export const useGraphQLQuery = <TData, TVariables extends OperationVariables>({
  query,
  isPaginate,
  saveGlobal,
}: useGraphQLQueryProps<TData>) => {
  const { setNotification, setPaginate } = useGlobalReducer()

  const [executeQuery, { data, loading, error, refetch }] = useLazyQuery<TData, TVariables>(query, {
    fetchPolicy: 'cache-and-network',
  })

  const extractedData = data ? Object.values<TData>(data)[0] : undefined

  useEffect(() => {
    if (extractedData && saveGlobal) {
      if (isPaginate && isDataPaginate<TData>(extractedData)) {
        saveGlobal(extractedData.result)
        setPaginate({ totalData: extractedData.total })
      } else {
        saveGlobal(extractedData)
      }
    }
  }, [extractedData])

  useEffect(() => {
    if (error) {
      setNotification(formatErrorMessage(error), 'error')
    }
  }, [error, setNotification])

  return { executeQuery, data, loading, error, refetch }
}
