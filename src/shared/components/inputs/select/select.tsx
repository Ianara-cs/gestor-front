import { Select as SelectAnt, SelectProps as SelectPropsAnt } from 'antd'
import { BoxSelect, TitleSelect } from './select.styles'

interface SelectProps extends SelectPropsAnt {
  title?: string
  margin?: string
}

const Select = ({ title, margin, ...props }: SelectProps) => {
  return (
    <BoxSelect style={{ margin }}>
      {title && <TitleSelect>{title}</TitleSelect>}
      <SelectAnt style={{ width: '100%' }} {...props} />
    </BoxSelect>
  )
}

export default Select
