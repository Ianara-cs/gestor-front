import { ContainerLogoName, ContainerMenu, LogoMenu, NameCompany } from './menu.styled'

const Menu = () => {
  return (
    <ContainerMenu>
      <ContainerLogoName>
        <LogoMenu />
        <NameCompany>Gestor CG</NameCompany>
      </ContainerLogoName>
    </ContainerMenu>
  )
}

export default Menu
