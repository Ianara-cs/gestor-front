import { DocumentNode, useMutation } from "@apollo/client"
import { formatErrorMessage } from "../functions/errorHandler"
import { useGlobalReducer } from "../../store/reducers/globalReducer/useGlobalReducer"
import { useNavigate } from "react-router"

interface useGraphQLMutationProps {
  mutation: DocumentNode,
  successMessage?: string
  navigateTo?: string
}

export const useGraphQLMutation = <TData>(
  {mutation, successMessage, navigateTo}: useGraphQLMutationProps
) => {
  const { setNotification } = useGlobalReducer()
  const navigate = useNavigate()

  const [mutate, { data, loading, error }] = useMutation<TData>(mutation, {
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

  })
  
  return {
    loading,
    data,
    error,
    mutate,
  }
}