import { Typography } from 'antd'
import styled from 'styled-components'
import SVGLogo from '../../icons/SVGLogo'
import { ResponsiveMenuProps } from '../../types/StyledTypes'
const { Text } = Typography

export const ContainerMenu = styled.div<ResponsiveMenuProps>`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #001529;
  width: ${({ buttonCollapsed }) => (buttonCollapsed ? '80px' : '240px')};
  transition: width 0.3s ease;
  -webkit-box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
  -moz-box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
  box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    position: ${({ buttonCollapsed }) => (buttonCollapsed ? 'relative' : 'fixed')};
    left: ${({ buttonCollapsed }) => (buttonCollapsed ? '-200px' : '0')};
    width: ${({ buttonCollapsed }) => (buttonCollapsed ? '0px' : '240px')};
    background-color: #001529;
    transition: all 0.3s ease-in-out;
    z-index: ${({ buttonCollapsed }) => (buttonCollapsed ? '1' : '1000')};
    box-shadow: ${({ buttonCollapsed }) =>
      buttonCollapsed ? 'none' : '2px 0 10px rgba(0, 0, 0, 0.2)'};
  }
`

export const ContainerLogoName = styled.div<ResponsiveMenuProps>`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  -webkit-box-shadow: -2px 6px 4px 0px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: -2px 6px 4px 0px rgba(0, 0, 0, 0.47);
  box-shadow: -2px 6px 4px 0px rgba(0, 0, 0, 0.47);

  justify-content: ${({ buttonCollapsed }) => (buttonCollapsed ? 'center' : 'flex-start')};
`

export const LogoMenu = styled(SVGLogo)<ResponsiveMenuProps>`
  width: 50px;
  height: 50px;
  margin: 0px 16px;
  fill: white;
  margin-right: ${({ buttonCollapsed }) => (buttonCollapsed ? '0' : '16px')};
`

export const NameCompany = styled(Text)<ResponsiveMenuProps>`
  color: white;
  display: ${({ buttonCollapsed }) => (buttonCollapsed ? 'none' : 'inline')};
  transition: display 0.4s ease;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 9;
`

export const MenuContent = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 60px);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`

export const FooterMenu = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #001529;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  bottom: 0;
  width: 100%;
`
