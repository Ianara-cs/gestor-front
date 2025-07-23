import styled from 'styled-components'
import { Select as SelectAnt } from 'antd'

export const BoxSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`

export const TitleSelect = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`

export const StyledSelect = styled(SelectAnt)`
  height: 40px;
  border-radius: 0.375rem;

  &:hover,
  &:focus {
    border-color: #6e8efb !important;
    box-shadow: 0 0 0 2px rgba(110, 142, 251, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`
