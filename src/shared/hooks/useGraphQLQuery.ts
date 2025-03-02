import { DocumentNode, OperationVariables, useQuery } from "@apollo/client"
import { useGlobalReducer } from "../../store/reducers/globalReducer/useGlobalReducer"
import { formatErrorMessage } from "../functions/errorHandler"
import { useEffect } from "react"

interface useGraphQLQueryProps<TData, TVariables> {
  query: DocumentNode, 
  variables?: TVariables,
  saveGlobal?: (object: TData) => void,
}

export const useGraphQLQuery = <TData, TVariables extends OperationVariables>(
  {query, variables, saveGlobal} : useGraphQLQueryProps< TData, TVariables>
) => {
  const { setNotification } = useGlobalReducer()

  const { data, loading, error, refetch } = useQuery<TData, TVariables>(query, {
    variables,
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
      setNotification(formatErrorMessage(error), "error")
    }
  }, [error, setNotification])

  return { data, loading, error, refetch }
}