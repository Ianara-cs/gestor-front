import { RouteObject } from "react-router";
import FirstScreen from "./screens/FirstScreen";
import PageNotFoundScreen from "./screens/PageNotFoundScreen";

export const firstScreenRoutes: RouteObject[] = [
  {
    path: '/',
    element: <FirstScreen/>,
    errorElement: <PageNotFoundScreen />,
  },
];