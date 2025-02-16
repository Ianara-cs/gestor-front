import { Modal } from 'antd'
import { HeaderContainer, LogoExit } from './header.style'
import { useState } from 'react'
import { logout } from '../../functions/connection/auth'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <HeaderContainer>
      <LogoExit onClick={showModal} />
      <Modal
        title="Atenção!"
        open={isModalOpen}
        onOk={logout}
        onCancel={handleCancel}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja sair?</p>
      </Modal>
    </HeaderContainer>
  )
}

export default Header
