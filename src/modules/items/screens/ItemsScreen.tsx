import Screen from '../../../shared/components/screen/Screen'
import {
  DisplayFlex,
} from '../../../shared/components/styles/display.styled'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import Button from '../../../shared/components/buttons/button/button'
import { Badge, Input, List, Modal } from 'antd'
import { useItem } from '../hooks/useItem'
import { convertNumberToMoney } from '../../../shared/functions/money'
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
import { ContainerSearch } from '../../menus/styles/menuScreen.style'
import { useScreenSizeReducer } from '../../../store/reducers/screenSizeReducer/useScreenSizeReducer'
const { Search } = Input

const ItemsScreen = () => {
  const {
    itemsFiltered,
    openModalDelete,
    onSearch,
    handleOnClick,
    handleEditItem,
    handleDeleteItem,
    handleCloseModalDelete,
    handleOpenModalDelete,
  } = useItem()
  const { screenSize } = useScreenSizeReducer()

  return (
    <Screen
      listBreadcrumb={[
        {
          title: 'HOME',
        },
        {
          title: 'ITENS',
        },
      ]}
    >
      <Modal
        title="Atenção!"
        open={openModalDelete}
        onOk={handleDeleteItem}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir o item?</p>
      </Modal>
      <ContainerSearch>
        <LimitedContainer width={screenSize?.isMobile ? 600 : 240}>
          <Search placeholder="Nome do item" onSearch={onSearch} enterButton />
        </LimitedContainer>
        {!screenSize?.isMobile && (
          <LimitedContainer width={120}>
            <Button onClick={handleOnClick} type="primary">
              Inserir
            </Button>
          </LimitedContainer>
        )}
      </ContainerSearch>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
          },
          pageSize: 3,
          align: "center"
        }}
        dataSource={itemsFiltered}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button 
                danger 
                onClick={() => handleOpenModalDelete(item.id)} 
                icon={<DeleteOutlined />}
              >
                Deletar
              </Button>,
              <Button
                onClick={() => handleEditItem(item.id)}
                icon={<EditOutlined />}
              >
                Editar
              </Button>,
            ]}
            extra={
              <img
                alt="logo"
                className="w-[272px] h-[150px] object-cover rounded"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRStdkp1Cb75cPjftUSntZc_DMJw4ocxVRARA&s"
              />
            }
          >
            <List.Item.Meta
              title={
                <span className="text-lg font-bold">
                  {item.name}
                </span>
              }
              description= {
                <DisplayFlex className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Badge
                      style={{ boxShadow: 'none' }}
                      count={item.menu.name}
                      showZero
                      color="#faad14"
                    />
                    <span className="flex gap-0.5 justify-center border border-solid rounded-2xl !px-3 text-sm">
                      <UserOutlined className="text-xs"/>
                      {item.quantityPeople}
                    </span>
                  </div>
                  <div>{item.description}</div>
                </DisplayFlex>
              }
            />
            <div className="text-base font-bold">
              {convertNumberToMoney(parseFloat(`${item.price}`))}
            </div>
          </List.Item>
        )}
      />
    </Screen>
  )
}

export default ItemsScreen
