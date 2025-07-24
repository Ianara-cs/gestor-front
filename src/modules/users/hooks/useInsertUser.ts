import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useGraphQLMutation } from '../../../shared/hooks/useGraphQLMutation'
import { UPDATE_ITEM } from '../../../shared/graphql/mutations/itemMutations'
import { useGraphQLQuery } from '../../../shared/hooks/useGraphQLQuery'
import { GET_ITEM } from '../../../shared/graphql/queries/itemQueries'
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer'
import { InsertUser } from '../../../shared/dtos/InsertUser.dto'
import { CREATE_USER } from '../../../shared/graphql/mutations/usersMutations'
import { UsersRoutesEnum } from '../router'

const DEFAULT_USER = {
  name: '',
  username: '',
  password: '',
  role: '',
}

export const useInsertUser = () => {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const [loadingUser, setLoadingUser] = useState<boolean>(false)
  const [disabledButton, setDisabledButton] = useState<boolean>(true)
  const { user: userReducer, setUser: setUserReducer } = useUserReducer()
  const [isEdit, setIsEdit] = useState(false)
  const [user, setUser] = useState<InsertUser>({
    name: '',
    password: '',
    role: '',
    username: '',
  })

  const { executeQuery: getItem } = useGraphQLQuery({
    query: GET_ITEM,
    saveGlobal: setUserReducer,
  })

  const { mutate: createUser } = useGraphQLMutation({
    mutation: CREATE_USER,
    successMessage: 'Usuário criado!',
    navigateTo: UsersRoutesEnum.USERS,
  })

  const { mutate: updateItem, loading } = useGraphQLMutation({
    mutation: UPDATE_ITEM,
    successMessage: 'Usuário modificado!',
    navigateTo: UsersRoutesEnum.USERS,
  })

  useEffect(() => {
    if (userReducer) {
      setUser({
        name: userReducer.name,
        username: userReducer.username,
        password: userReducer.password,
        role: userReducer.role,
      })
    }
  }, [userReducer])

  useEffect(() => {
    const findItem = async () => {
      setLoadingUser(true)
      await getItem({
        variables: {
          data: `${itemId}`,
        },
      })
      setLoadingUser(false)
    }

    if (itemId) {
      setIsEdit(true)
      findItem()
    } else {
      setUserReducer(undefined)
      setUser(DEFAULT_USER)
    }
  }, [])

  useEffect(() => {
    if (user.name && user.username && user.password && user.role) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [user])

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setUser({
      ...user,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    })
  }

  const handleChangeSelect = (value: string) => {
    setUser({
      ...user,
      role: value,
    })
  }

  const handleClickCancel = () => {
    navigate(UsersRoutesEnum.USERS)
  }

  const handleInsertUser = async () => {
    if (itemId) {
      await updateItem({
        variables: {
          data: { ...user, id: itemId },
        },
      })
    } else {
      await createUser({
        variables: {
          data: user,
        },
      })
    }
  }

  return {
    user,
    loading,
    disabledButton,
    loadingItem: loadingUser,
    isEdit,
    onChangeInput,
    handleChangeSelect,
    handleClickCancel,
    handleInsertUser,
  }
}
