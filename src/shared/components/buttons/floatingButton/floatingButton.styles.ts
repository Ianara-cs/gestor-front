import { Button } from 'antd'
import styled from 'styled-components'

interface ButtonProps {
  width?: string
}

export const FloatingButtonContainer = styled.div`
  width: 100%;
  height: 8%;
  position: fixed;
  background-color: #f5f5f5;
  bottom: 0px;
  right: 0px;
  z-index: 998;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FloatingButtonAnt = styled(Button)<ButtonProps>`
  width: ${({ width }) => width || 'auto'};
  height: 65%;
`
