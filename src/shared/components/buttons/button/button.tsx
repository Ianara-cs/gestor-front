import { ButtonProps } from "antd/es/button"
import { ButtonAnt } from "./button.styles"

interface ButtonCurrentProps extends ButtonProps {
  margin?: string
}

const Button = ({margin, ...props}: ButtonCurrentProps) => {
  return <ButtonAnt style={{ margin }} {...props} />
}

export default Button