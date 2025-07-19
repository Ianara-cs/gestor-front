import Screen from '../../../shared/components/screen/Screen'
import Button from '../../../shared/components/buttons/button/button'
import { Badge, Input, Modal } from 'antd'
import { DisplayFlex, FlexJustifyCenter } from '../../../shared/components/styles/display.styled'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import { useMenu } from '../hooks/useMenu'
import { DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons'
import Card from '../../../shared/components/card/Card'
import Loading from '../../../shared/components/loading/Loading'
import Pagination from '../../../shared/components/pagination/pagination'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import FloatingButton from '../../../shared/components/buttons/floatingButton/floatingButton'
import { useScreenSizeReducer } from '../../../store/reducers/screenSizeReducer/useScreenSizeReducer'
import { ContainerSearch } from '../styles/menuScreen.style'
const { Search } = Input

const MenuScreen = () => {
  const {
    menusFiltered,
    openModalDelete,
    loading,
    handleOnClick,
    onSearch,
    handleDeleteMenu,
    handleEditMenu,
    handleCloseModalDelete,
    handleOpenModalDelete,
    changePage,
  } = useMenu()
  const { paginate } = useGlobalReducer()
  const { screenSize } = useScreenSizeReducer()

  return (
    <Screen
      listBreadcrumb={[
        {
          title: 'HOME',
        },
        {
          title: 'MENUS',
        },
      ]}
    >
      <Modal
        title="Atenção!"
        open={openModalDelete}
        onOk={handleDeleteMenu}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir o menu?</p>
      </Modal>
      <ContainerSearch>
        <LimitedContainer width={screenSize?.isMobile ? 600 : 240}>
          <Search placeholder="Nome do menu" onSearch={onSearch} enterButton />
        </LimitedContainer>
        {!screenSize?.isMobile && (
          <LimitedContainer width={120}>
            <Button onClick={handleOnClick} type="primary">
              Inserir
            </Button>
          </LimitedContainer>
        )}
      </ContainerSearch>
      <FlexJustifyCenter style={{ flexWrap: 'wrap', gap: '16px' }}>
        {loading ? (
          <Loading size="large" />
        ) : (
          menusFiltered.map((menu) => (
            <Badge.Ribbon
              key={menu.id}
              text={menu.category == 'KITCHEN' ? 'COZINHA' : menu.category}
              color={menu.category == 'KITCHEN' ? 'red' : 'volcano'}
            >
              <Card
                style={{
                  width: 300,
                  backgroundColor: '#E8F5E9',
                  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                }}
                actions={[
                  // <SettingOutlined key="setting" title="ferrass" />,
                  <EditOutlined
                    key="edit"
                    title="editar"
                    onClick={() => handleEditMenu(menu.id)}
                  />,
                  <DeleteOutlined
                    key="delete"
                    title="excluir"
                    onClick={() => handleOpenModalDelete(menu.id)}
                  />,
                ]}
                styles={{}}
                typeCard="Meta"
                metaProps={{
                  title: menu.name,
                  description: (
                    <DisplayFlex>
                      <Badge
                        style={{ boxShadow: 'none' }}
                        count={`Itens: ${menu.items?.length ? menu.items?.length : 0}`}
                        showZero
                        color="#faad14"
                      />
                    </DisplayFlex>
                  ),
                }}
              />
            </Badge.Ribbon>
          ))
        )}
      </FlexJustifyCenter>
      <Pagination
        style={{ marginBottom: screenSize?.isMobile ? '30px' : 'auto' }}
        onChange={changePage}
        total={paginate?.totalData}
      />
      {screenSize?.isMobile && (
        <FloatingButton onClick={handleOnClick} type="primary" children={'Inserir'} width="60%" />
      )}
    </Screen>
  )
}
export default MenuScreen
