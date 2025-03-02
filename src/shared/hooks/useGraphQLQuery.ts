import { DocumentNode, OperationVariables, useLazyQuery, useQuery } from '@apollo/client'
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer'
import { formatErrorMessage } from '../functions/errorHandler'
import { useEffect } from 'react'

interface useGraphQLQueryProps<TData> {
  query: DocumentNode
  //variables?: TVariables
  saveGlobal?: (object: TData) => void
}

export const useGraphQLQuery = <TData, TVariables extends OperationVariables>({
  query,
  //variables,
  saveGlobal,
}: useGraphQLQueryProps<TData>) => {
  const { setNotification } = useGlobalReducer()

  const [executeQuery, { data, loading, error, refetch }] = useLazyQuery<TData, TVariables>(query, {
    fetchPolicy: 'cache-and-network',
  })

  const extractedData = data ? Object.values<TData>(data)[0] : undefined

  useEffect(() => {
    if (extractedData && saveGlobal) {
      saveGlobal(extractedData)
    }
  }, [extractedData, saveGlobal])

  useEffect(() => {
    if (error) {
      setNotification(formatErrorMessage(error), 'error')
    }
  }, [error, setNotification])

  return { executeQuery, data, loading, error, refetch }
}
