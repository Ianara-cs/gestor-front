import { HomeOutlined, LaptopOutlined } from '@ant-design/icons'
import { ContainerLogoName, ContainerMenu, LogoMenu, NameCompany } from './menu.styled'
import type { MenuProps } from 'antd'
import { Menu as MenuAnt } from 'antd'
import { useNavigate } from 'react-router'
import { MenuRoutesEnum } from '../../../modules/menus/routes'
import { useState } from 'react'
import { ItemsRoutesEnum } from '../../../modules/items/routes'

type MenuItem = Required<MenuProps>['items'][number]

const Menu = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('1')

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Principal',
      icon: <HomeOutlined />,
    },
    {
      key: 'menus',
      label: 'Menus',
      icon: <LaptopOutlined />,
      children: [
        {
          key: 'menus_view',
          label: 'Visualizar',
          onClick: () => navigate(MenuRoutesEnum.MENU),
        },
        {
          key: 'menus_insert',
          label: 'Inserir',
          onClick: () => navigate(MenuRoutesEnum.MENUS_INSERT),
        },
      ],
    },
    {
      key: 'items',
      label: 'Itens',
      icon: <LaptopOutlined />,
      children: [
        {
          key: 'items_view',
          label: 'Visualizar',
          onClick: () => navigate(ItemsRoutesEnum.ITEM),
        },
      ],
    },
  ]

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return (
    <ContainerMenu>
      <ContainerLogoName>
        <LogoMenu />
        <NameCompany>Gestor CG</NameCompany>
      </ContainerLogoName>
      <MenuAnt
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ width: 240 }}
        selectedKeys={[current]}
        mode="inline"
        theme="dark"
        onClick={onClick}
        items={items}
      />
    </ContainerMenu>
  )
}

export default Menu
