import { useEffect } from "react";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequest";
import { MenuType } from "../types/MenuType";
import { URL_MENU } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";

const MenuScreen = () => {
  const { menus, setMenus } = useDataContext();
  const { request } = useRequests();

  console.log(menus)

  useEffect(() => {
    request<MenuType[]>(URL_MENU, MethodsEnum.GET, setMenus);
  }, []);

  return menus.map((menu) => <div key={menu.id}>{menu.name}</div>);
};
export default MenuScreen;