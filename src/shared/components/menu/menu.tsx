import {
  HomeOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  ContainerLogoName,
  ContainerMenu,
  FooterMenu,
  LogoMenu,
  MenuContent,
  NameCompany,
  Overlay,
} from './menu.styled'
import type { MenuProps } from 'antd'
import { Menu as MenuAnt } from 'antd'
import { useNavigate } from 'react-router'
import { MenuRoutesEnum } from '../../../modules/menus/routes'
import { useState } from 'react'
import { ItemsRoutesEnum } from '../../../modules/items/routes'
import Button from '../buttons/button/button'
import { useButtonMenuCollapsedReducer } from '../../../store/reducers/buttonMenuCollapsedReducer/buttonMenuCollapsedReducer'
import { useScreenSizeReducer } from '../../../store/reducers/screenSizeReducer/useScreenSizeReducer'
import { UsersRoutesEnum } from '../../../modules/users/router'

type MenuItem = Required<MenuProps>['items'][number]

const Menu = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('menus')
  const { buttonMenuActivate, setButtonMenuCollapsed } = useButtonMenuCollapsedReducer()
  const { screenSize } = useScreenSizeReducer()

  const toggleCollapsed = () => {
    setButtonMenuCollapsed(!buttonMenuActivate)
  }

  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Principal',
      icon: <HomeOutlined />,
    },
    {
      key: 'menus',
      label: 'Menus',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '2',
          label: 'Visualizar',
          onClick: () => navigate(MenuRoutesEnum.MENUS),
        },
        {
          key: '3',
          label: 'Inserir',
          onClick: () => navigate(MenuRoutesEnum.MENU_INSERT),
        },
      ],
    },
    {
      key: 'items',
      label: 'Itens',
      icon: <ProductOutlined />,
      children: [
        {
          key: '4',
          label: 'Visualizar',
          onClick: () => navigate(ItemsRoutesEnum.ITEM),
        },
        {
          key: '5',
          label: 'Inserir',
          onClick: () => navigate(ItemsRoutesEnum.ITEM_INSERT),
        },
      ],
    },
    {
      key: 'users',
      label: 'Usuários',
      icon: <UserOutlined />,
      children: [
        {
          key: '6',
          label: 'Visualizar',
          onClick: () => navigate(UsersRoutesEnum.USERS),
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
        <div className="nome">
          <ContainerLogoName buttonCollapsed={buttonMenuActivate}>
            <LogoMenu buttonCollapsed={buttonMenuActivate} />
            <NameCompany buttonCollapsed={buttonMenuActivate}>Gestor CG</NameCompany>
          </ContainerLogoName>
          <MenuContent>
            <MenuAnt
              defaultSelectedKeys={['2']}
              defaultOpenKeys={['menus']}
              selectedKeys={[current]}
              mode="inline"
              theme="dark"
              onClick={onClick}
              inlineCollapsed={buttonMenuActivate}
              items={items}
            />
          </MenuContent>
        </div>
        <FooterMenu>
          <Button type="primary" onClick={toggleCollapsed} style={{ margin: 16 }}>
            {buttonMenuActivate ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            {!buttonMenuActivate && 'Fechar Menu'}
          </Button>
        </FooterMenu>
      </ContainerMenu>
    </>
  )
}

export default Menu
