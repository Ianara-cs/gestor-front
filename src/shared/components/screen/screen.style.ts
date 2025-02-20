import styled from 'styled-components'
import { ResponsiveMenuProps } from '../../types/StyledTypes'

export const ScreenContainer = styled.div<ResponsiveMenuProps>`
  background-color: white;
  padding: 32px;
  margin: 114px 32px 10px 32px;
  width: ${({ buttonCollapsed }) =>
    buttonCollapsed ? 'calc(100% - 144px)' : 'calc(100% - 304px)'};
  margin-left: auto;
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    transition: width 0.5s ease;
    margin-top: 72px;
  }
`
