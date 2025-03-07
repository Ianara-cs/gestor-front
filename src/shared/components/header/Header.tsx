import { Modal } from 'antd'
import { HeaderContainer, LogoExit } from './header.style'
import { useState } from 'react'
import { logout } from '../../functions/connection/auth'
import { useNavigate } from 'react-router'
import { useButtonMenuCollapsedReducer } from '../../../store/reducers/buttonMenuCollapsedReducer/buttonMenuCollapsedReducer'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import Button from '../buttons/button/button'
import { useScreenSizeReducer } from '../../../store/reducers/screenSizeReducer/useScreenSizeReducer'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const { buttonMenuActivate, setButtonMenuCollapsed } = useButtonMenuCollapsedReducer()
  const { screenSize } = useScreenSizeReducer()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleLogout = async () => {
    await logout(navigate)
  }

  return (
    <HeaderContainer buttonCollapsed={buttonMenuActivate}>
      {screenSize?.isMobile && (
        <Button
          type="primary"
          onClick={() => setButtonMenuCollapsed(!buttonMenuActivate)}
          style={{ width: '20px' }}
        >
          {buttonMenuActivate ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      )}
      <>
        <LogoExit onClick={showModal} />
        <Modal
          title="Atenção!"
          open={isModalOpen}
          onOk={handleLogout}
          onCancel={handleCancel}
          okText="Sim"
          cancelText="Cancelar"
        >
          <p>Tem certeza que deseja sair?</p>
        </Modal>
      </>
    </HeaderContainer>
  )
}

export default Header
