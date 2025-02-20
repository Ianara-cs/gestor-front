import { Typography } from 'antd'
import styled from 'styled-components'
import SVGLogo from '../../icons/SVGLogo'
import { ResponsiveMenuProps } from '../../types/StyledTypes'
const { Text } = Typography

export const ContainerMenu = styled.div<ResponsiveMenuProps>`
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

  @media (max-width: 768px) {
    /* width: 0px;
    left: -200px; */
    position: ${({ buttonCollapsed }) => (buttonCollapsed ? 'relative' : 'fixed')};
    left: ${({ buttonCollapsed }) => (buttonCollapsed ? '-200px' : '0')};
    width: ${({ buttonCollapsed }) =>
      buttonCollapsed ? '0px' : '240px'}; /* Define o tamanho do menu */
    /* height: 100vh; */
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
  background: rgba(0, 0, 0, 0.5); // Fundo escuro semitransparente
  backdrop-filter: blur(5px); // Efeito de desfoque
  z-index: 9; // Acima dos elementos normais, mas abaixo do menu
`
