import { DefaultContext, DocumentNode, useMutation } from '@apollo/client'
import { formatErrorMessage } from '../functions/errorHandler'
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

interface useGraphQLMutationProps<TData> {
  mutation: DocumentNode
  successMessage?: string
  navigateTo?: string
  saveGlobal?: (object: TData) => void
}

export const useGraphQLMutation = <TData, TVariables, DefaultContext>({
  mutation,
  successMessage,
  navigateTo,
  saveGlobal,
}: useGraphQLMutationProps<TData>) => {
  const { setNotification } = useGlobalReducer()
  const navigate = useNavigate()

  const [mutate, { data, loading, error }] = useMutation<TData, TVariables, DefaultContext>(
    mutation,
    {
      onCompleted: () => {
        if (successMessage) {
          setNotification('Sucesso!', 'success', successMessage)
        }

        if (navigateTo) {
          navigate(navigateTo)
        }
      },
      onError: (error) => {
        setNotification(formatErrorMessage(error), 'error')
      },
    },
  )

  const extractedData = data ? Object.values<TData>(data)[0] : undefined

  useEffect(() => {
    if (extractedData && saveGlobal) {
      saveGlobal(extractedData)
    }
  }, [extractedData, saveGlobal])

  return {
    loading,
    data,
    error,
    mutate,
  }
}
