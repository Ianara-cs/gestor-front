import { createBrowserRouter, RouteObject } from "react-router";
import { loginRoutes } from "./modules/login/routes";

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>Tela Principal</div>,
    errorElement: <div>Página não encontrada</div>,
  },
];

export const router = createBrowserRouter([
  ...loginRoutes, ...mainRoutes
]);