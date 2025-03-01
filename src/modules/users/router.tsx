import { RouteObject } from 'react-router'
import UsersScreen from './screens/UsersScreen'

export enum UsersRoutesEnum {
  USERS = '/users',
}

export const usersScreensRoutes: RouteObject[] = [
  {
    path: UsersRoutesEnum.USERS,
    element: <UsersScreen />,
  },
]
