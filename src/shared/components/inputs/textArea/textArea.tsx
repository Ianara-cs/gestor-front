import { BoxInput, TitleInput } from '../input/input.styles'
import TextAreaAnt, { TextAreaProps as TextAreaAntProps } from 'antd/es/input/TextArea'

interface TextAreaProps extends TextAreaAntProps {
  title?: string
  margin?: string
}

const TextArea = ({ title, margin, ...props }: TextAreaProps) => {
  return (
    <BoxInput style={{ margin }}>
      {title && <TitleInput>{title}</TitleInput>}
      <TextAreaAnt style={{ width: '100%' }} {...props} />
    </BoxInput>
  )
}

export default TextArea
