import { SelectProps as SelectPropsAnt } from 'antd'
import { BoxSelect, StyledSelect, TitleSelect } from './select.styles'

interface SelectProps extends SelectPropsAnt {
  title?: string
  margin?: string
}

const Select = ({ title, margin, ...props }: SelectProps) => {
  return (
    <BoxSelect style={{ margin }}>
      {title && <TitleSelect>{title}</TitleSelect>}
      <StyledSelect style={{ width: '100%' }} {...props} />
    </BoxSelect>
  )
}

export default Select
