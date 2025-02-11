import { Input as InputAnt, InputProps as InputPropsAnt } from 'antd'
import { BoxInput, TitleInput } from './input.styles'

interface InputProps extends InputPropsAnt{
  title?: string
}

const Input = ({title, ...props}: InputProps) => {
  return (
    <BoxInput>
      <TitleInput>{title}</TitleInput>
      <InputAnt {...props} />
    </BoxInput>
  )
}

export default Input
