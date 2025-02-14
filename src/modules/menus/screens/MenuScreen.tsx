import { useEffect } from "react";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequest";
import { MenuType } from "../types/MenuType";
import { URL_MENU } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { ColumnsType } from "antd/es/table";
import Table from "../../../shared/components/table/Table";

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

  useEffect(() => {
    request<MenuType[]>(URL_MENU, MethodsEnum.GET, setMenus);
  }, []);

  return <Table columns={columns} dataSource={menus} />;
};
export default MenuScreen;