import { Modal } from 'antd'
import { HeaderContainer, LogoExit } from './header.style'
import { useState } from 'react'
import { logout } from '../../functions/connection/auth'
import { useNavigate } from 'react-router'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

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
        onOk={() => logout(navigate)}
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
