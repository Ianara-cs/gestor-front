import { createBrowserRouter } from "react-router";
import { loginRoutes } from "./modules/login/routes";
import { firstScreenRoutes } from "./modules/firstScreen/routes";
import { productScreens } from "./modules/product/routes";

export const router = createBrowserRouter([
  ...loginRoutes, 
  ...firstScreenRoutes,
  ...productScreens,
]);