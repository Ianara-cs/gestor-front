import styled from 'styled-components'
import { ResponsiveMenuProps } from '../../types/StyledTypes'

export const ScreenContainer = styled.div<ResponsiveMenuProps>`
  background-color: white;
  padding: 32px;
  //margin-top: 72px;
  width: ${({ buttonCollapsed }) =>
    buttonCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 240px)'};
  margin-left: auto;
  transition: width 0.3s ease;

  @media (max-width: 767px) {
    width: 100%;
    margin: 0;
    transition: width 0.5s ease;
  }
`
