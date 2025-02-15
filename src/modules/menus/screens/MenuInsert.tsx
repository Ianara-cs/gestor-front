import { Select } from "antd"
import Input from "../../../shared/components/inputs/input"
import Screen from "../../../shared/components/screen/Screen"
import { MenuRoutesEnum } from "../routes"
import { LimitedContainer } from "../styles/menuInsert"
import Button from "../../../shared/components/buttons/button/button"

const MenuInsert = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
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
          title: 'INSERIR MENU',
        },]
      }
    >
      <LimitedContainer>
        <Input margin={"0px 0px 16px 0px"} title="Nome" placeholder="Nome"/>
        <Select
          defaultValue="BAR"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'BAR', label: 'Bar' },
            { value: 'KITCHEN', label: 'Cozinha' },
          ]}
        />
        <Button type="primary">Inserir Menu</Button>
      </LimitedContainer>
    </Screen>
  )
}

export default MenuInsert