import { RouteObject } from "react-router";
import LoginScreen from "./screens/LoginScreen";


export const loginRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginScreen />,
  }
]