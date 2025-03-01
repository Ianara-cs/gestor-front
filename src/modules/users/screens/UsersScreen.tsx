import Search from "antd/es/input/Search"
import Button from "../../../shared/components/buttons/button/button"
import Screen from "../../../shared/components/screen/Screen"
import { FlexJustifyBetween } from "../../../shared/components/styles/display.styled"
import { LimitedContainer } from "../../../shared/components/styles/limited.styled"
import Table from "../../../shared/components/table/Table"

const UsersScreen = () => {
  return (
    <Screen>
      <FlexJustifyBetween>
        <LimitedContainer width={240}>
          <Search placeholder="Nome do item"  enterButton />
        </LimitedContainer>
        <LimitedContainer width={120}>
          <Button type="primary">
            Inserir
          </Button>
        </LimitedContainer>
      </FlexJustifyBetween>
      <Table />
    </Screen>
  )
}

export default UsersScreen