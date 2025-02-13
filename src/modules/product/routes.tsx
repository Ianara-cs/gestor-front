import { RouteObject } from "react-router";
import ProductScreen from "./screens/ProductScreen";

export enum ProductRoutesEnum {
  PRODUCT = '/product',
}

export const productScreens: RouteObject[] = [
  {
    path: ProductRoutesEnum.PRODUCT,
    element: <ProductScreen />,
  },
];