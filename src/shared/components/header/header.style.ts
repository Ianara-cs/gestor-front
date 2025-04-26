import { LogoutOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { ResponsiveMenuProps } from '../../types/StyledTypes'

export const HeaderContainer = styled.header<ResponsiveMenuProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  width: ${({ buttonCollapsed }) => (buttonCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 240px)')};
  transition: width 0.4s ease;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 32px 0px 10px;
  background-color: white;
  z-index: 1000;
  border-bottom: solid 1px #eeee;

  //-webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.47);
  //-moz-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.47);
  //box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.47);

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`

export const LogoExit = styled(LogoutOutlined)`
  font-size: 24px;
`
