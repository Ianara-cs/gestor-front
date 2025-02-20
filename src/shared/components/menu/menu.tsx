import {
  HomeOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { ContainerLogoName, ContainerMenu, LogoMenu, NameCompany, Overlay } from './menu.styled'
import type { MenuProps } from 'antd'
import { Menu as MenuAnt } from 'antd'
import { useNavigate } from 'react-router'
import { MenuRoutesEnum } from '../../../modules/menus/routes'
import { useEffect, useState } from 'react'
import { ItemsRoutesEnum } from '../../../modules/items/routes'
import Button from '../buttons/button/button'
import { useButtonMenuCollapsedReducer } from '../../../store/reducers/buttonMenuCollapsedReducer/buttonMenuCollapsedReducer'
import { useScreenSizeReducer } from '../../../store/reducers/screenSizeReducer/useScreenSizeReducer'

type MenuItem = Required<MenuProps>['items'][number]

const Menu = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('1')
  const { buttonMenuActivate, setButtonMenuCollapsed } = useButtonMenuCollapsedReducer()
  const { screenSize } = useScreenSizeReducer()

  const toggleCollapsed = () => {
    setButtonMenuCollapsed(!buttonMenuActivate)
    console.log('MENU1', buttonMenuActivate)
  }

  console.log('MENU', buttonMenuActivate)

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
        {
          key: 'items_insert',
          label: 'Inserir',
          onClick: () => navigate(ItemsRoutesEnum.ITEM_INSERT),
        },
      ],
    },
  ]

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return (
    <>
      {screenSize?.isMobile && !buttonMenuActivate && (
        <Overlay onClick={() => setButtonMenuCollapsed(true)} />
      )}
      <ContainerMenu buttonCollapsed={buttonMenuActivate}>
        <ContainerLogoName buttonCollapsed={buttonMenuActivate}>
          <LogoMenu buttonCollapsed={buttonMenuActivate} />
          <NameCompany buttonCollapsed={buttonMenuActivate}>Gestor CG</NameCompany>
        </ContainerLogoName>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {buttonMenuActivate ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <MenuAnt
          defaultSelectedKeys={['menus']}
          selectedKeys={[current]}
          mode="inline"
          theme="dark"
          onClick={onClick}
          inlineCollapsed={buttonMenuActivate}
          items={[...items]}
        />
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {buttonMenuActivate ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </ContainerMenu>
    </>
  )
}

export default Menu
