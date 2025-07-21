import { RouteObject } from 'react-router'
import UsersScreen from './screens/UsersScreen'
import UserInsert from './screens/UserInsert'

export enum UsersRoutesEnum {
  USERS = '/users',
  CREATE_USER = '/user/criar',
}

export const usersScreensRoutes: RouteObject[] = [
  {
    path: UsersRoutesEnum.USERS,
    element: <UsersScreen />,
  },
  {
    path: UsersRoutesEnum.CREATE_USER,
    element: <UserInsert />,
  },
]
