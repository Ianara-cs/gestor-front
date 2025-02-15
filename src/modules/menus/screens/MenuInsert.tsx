import Input from "../../../shared/components/inputs/input/input"
import Screen from "../../../shared/components/screen/Screen"
import { MenuRoutesEnum } from "../routes"
import { LimitedContainer } from "../styles/menuInsert"
import Button from "../../../shared/components/buttons/button/button"
import Select from "../../../shared/components/inputs/select/select"
import { useState } from "react"
import { InsertMenu } from "../../../shared/dtos/insertMenu.dto"
import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI"
import { URL_MENU } from "../../../shared/constants/urls"

const MenuInsert = () => {
  const [menu, setMenu] = useState<InsertMenu>({
    name: '',
    category: ''
  })

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setMenu({
      ...menu,
      category: value
    })
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setMenu({
      ...menu,
      [nameObject]: event.target.value,
    })
  }


  const handleInsertMenu = () => {
    connectionAPIPost(URL_MENU, menu)
  }
  
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
        <Input 
          onChange={(event) => onChange(event, 'name')} 
          margin={"0px 0px 16px 0px"} 
          title="Nome" 
          placeholder="Nome"
        />
        <Select
          margin={"0px 0px 32px 0px"} 
          defaultValue="BAR"
          style={{ width: '100%' }}
          onChange={handleChange}
          options={[
            { value: 'BAR', label: 'Bar' },
            { value: 'KITCHEN', label: 'Cozinha' },
          ]}
        />
        <Button onClick={handleInsertMenu} type="primary">Inserir Menu</Button>
      </LimitedContainer>
    </Screen>
  )
}

export default MenuInsert