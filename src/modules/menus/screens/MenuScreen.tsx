import { useEffect } from "react";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequest";
import { MenuType } from "../types/MenuType";
import { URL_MENU } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { ColumnsType } from "antd/es/table";
import Table from "../../../shared/components/table/Table";
import Screen from "../../../shared/components/screen/Screen";
import Button from "../../../shared/components/buttons/button/button";
import { useNavigate } from "react-router";
import { MenuRoutesEnum } from "../routes";
import Breadcrumb from "../../../shared/components/breadcrumb/Breadcrumb";

const columns: ColumnsType<MenuType> = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    key: 'category',
    render: (text) => <a>{text}</a>,
  },
];

const MenuScreen = () => {
  const { menus, setMenus } = useDataContext();
  const { request } = useRequests();
  const navigate = useNavigate()

  useEffect(() => {
    request<MenuType[]>(URL_MENU, MethodsEnum.GET, setMenus);
  }, []);

  const handleOnClick = () => {
    navigate(MenuRoutesEnum.MENUS_INSERT)
  }

  return (
    <Screen listBreadcrumb={[
      {
        title: 'HOME',
      },
      {
        title: 'PRODUTOS',
      },
    ]} >
      <Breadcrumb />
      <Button onClick={handleOnClick}>Inserir</Button>
      <Table columns={columns} dataSource={menus} /> 
    </Screen>
  )
};
export default MenuScreen;