import { createBrowserRouter, RouteObject } from 'react-router'
import { loginRoutes } from './modules/login/routes'
import { firstScreenRoutes } from './modules/firstScreen/routes'
import { menuScreens } from './modules/menus/routes'
import { verifyLoggedIn } from './shared/functions/connection/auth'
import { itemsScreens } from './modules/items/routes'

const routes: RouteObject[] = [...loginRoutes]
const routesLoggedIn: RouteObject[] = [...menuScreens, ...itemsScreens, ...firstScreenRoutes].map(
  (route) => ({
    ...route,
    loader: verifyLoggedIn,
  }),
)

export const router = createBrowserRouter([...routes, ...routesLoggedIn])
