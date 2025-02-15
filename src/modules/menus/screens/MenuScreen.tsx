import { useEffect, useState } from "react";
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
import { BoxButtons, LimitSizeButton, LimitSizeInput } from "../styles/menu.style";
import { Input } from "antd";
const { Search } = Input;

const columns: ColumnsType<MenuType> = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
];

const MenuScreen = () => {
  const { menus, setMenus } = useDataContext();
  const { request } = useRequests();
  const [menusFiltered, setMenusFiltered] = useState<MenuType[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setMenusFiltered([...menus])
  }, [menus])

  useEffect(() => {
    request<MenuType[]>(URL_MENU, MethodsEnum.GET, setMenus);
  }, []);

  const handleOnClick = () => {
    navigate(MenuRoutesEnum.MENUS_INSERT)
  }

  const onSearch = (value: string) => {
    if (!value) {
      setMenusFiltered([...menus]);
    } else {
      setMenusFiltered([...menusFiltered.filter((menu) => menu.name.includes(value))]);
    }
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
      <BoxButtons>
        <LimitSizeInput>
          <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </LimitSizeInput>
        <LimitSizeButton>
          <Button type="primary" onClick={handleOnClick}>Inserir</Button>
        </LimitSizeButton>
      </BoxButtons>
      <Table columns={columns} dataSource={menusFiltered} /> 
    </Screen>
  )
};
export default MenuScreen;