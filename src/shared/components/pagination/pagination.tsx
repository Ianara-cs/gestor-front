import { Pagination as PaginationAnt, PaginationProps } from 'antd'
import { FlexJustifyCenter } from '../styles/display.styled'

const Pagination = ({ ...props }: PaginationProps) => {
  return (
    <FlexJustifyCenter margin="24px 0px">
      <PaginationAnt defaultPageSize={15} {...props} />
    </FlexJustifyCenter>
  )
}

export default Pagination
