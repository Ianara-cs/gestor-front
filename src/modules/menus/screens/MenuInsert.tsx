import Input from "../../../shared/components/inputs/input/input"
import Screen from "../../../shared/components/screen/Screen"
import { MenuRoutesEnum } from "../routes"
import Button from "../../../shared/components/buttons/button/button"
import Select from "../../../shared/components/inputs/select/select"
import { useState } from "react"
import { InsertMenu } from "../../../shared/dtos/insertMenu.dto"
import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI"
import { URL_MENU } from "../../../shared/constants/urls"
import { LimitedContainer } from "../../../shared/components/styles/limited.styled"
import { MenuInsertContainer } from "../styles/menuInsert"
import { useNavigate } from "react-router"
import { DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled"
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext"

const MenuInsert = () => {
  const navigate = useNavigate()
  const {setNotification} = useGlobalContext()
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

  const handleClickCancel = () => {
    navigate(MenuRoutesEnum.MENU)
  }


  const handleInsertMenu = () => {
    if(!menu.name && !menu.category) {
      setNotification('Campos vazios!', 'warning', '"nome" e "categoria" não podem ser vazios');
    } else {
      connectionAPIPost(URL_MENU, menu)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Menu inserido com sucesso!');
        navigate(MenuRoutesEnum.MENU);
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      });
    }
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
      <MenuInsertContainer>
        <LimitedContainer width={400}>
          <Input 
            onChange={(event) => onChange(event, 'name')} 
            margin={"0px 0px 16px 0px"} 
            title="Nome" 
            placeholder="Nome"
          />
          <Select
            title="Categoria"
            margin={"0px 0px 32px 0px"} 
            // defaultValue="BAR"
            placeholder='Escolha uma categoria'
            style={{ width: '100%' }}
            onChange={handleChange}
            options={[
              { value: 'BAR', label: 'Bar' },
              { value: 'KITCHEN', label: 'Cozinha' },
            ]}
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button danger onClick={handleClickCancel} >Cancelar</Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button onClick={handleInsertMenu} type="primary">Inserir Menu</Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </MenuInsertContainer>
    </Screen>
  )
}

export default MenuInsert