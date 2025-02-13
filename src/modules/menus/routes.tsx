import { RouteObject } from "react-router";
import MenuScreen from "./screens/MenuScreen";

export enum MenuRoutesEnum {
  MENU = '/menus',
}

export const menuScreens: RouteObject[] = [
  {
    path: MenuRoutesEnum.MENU,
    element: <MenuScreen />,
  },
];