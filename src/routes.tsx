import { createBrowserRouter } from "react-router";
import { loginRoutes } from "./modules/login/routes";
import { firstScreenRoutes } from "./modules/firstScreen/routes";
import { menuScreens } from "./modules/menus/routes";

export const router = createBrowserRouter([
  ...loginRoutes, 
  ...firstScreenRoutes,
  ...menuScreens,
]);