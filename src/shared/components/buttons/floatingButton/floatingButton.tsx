import { ButtonProps } from 'antd/es/button'
import { FloatingButtonAnt, FloatingButtonContainer } from './floatingButton.styles'

interface ButtonCurrentProps extends ButtonProps {
  width?: string
  children: React.ReactNode
}

const FloatingButton = ({ children, width, ...props }: ButtonCurrentProps) => {
  return (
    <FloatingButtonContainer>
      <FloatingButtonAnt width={width} {...props}>
        {children}
      </FloatingButtonAnt>
    </FloatingButtonContainer>
  )
}

export default FloatingButton
