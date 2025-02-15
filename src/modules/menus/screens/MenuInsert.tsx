import Screen from "../../../shared/components/screen/Screen"
import { MenuRoutesEnum } from "../routes"

const MenuInsert = () => {
  return (
    <Screen 
      listBreadcrumb={
        [ {
          title: 'HOME',
        },
        {
          title: 'MENUS',
          href: MenuRoutesEnum.MENU,
        },
        {
          title: 'INSERIR PRODUTO',
        },]
      }
    >
      <h2>Inserir Menu</h2>
    </Screen>
  )
}

export default MenuInsert