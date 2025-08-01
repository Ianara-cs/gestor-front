import { InputProps as InputPropsAnt } from 'antd'
import { BoxInput, StyledInput, TitleInput } from './input.styles'

export interface InputProps extends InputPropsAnt {
  title?: string
  margin?: string
}

const Input = ({ title, margin, ...props }: InputProps) => {
  return (
    <BoxInput style={{ margin }}>
      {title && <TitleInput>{title}</TitleInput>}
      <StyledInput {...props} />
    </BoxInput>
  )
}

export default Input
