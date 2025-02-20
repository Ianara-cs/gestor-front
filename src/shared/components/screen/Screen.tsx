import React, { useEffect } from 'react'
import { ScreenContainer } from './screen.style'
import Breadcrumb, { ListBreadcrumb } from '../breadcrumb/Breadcrumb'
import { Divider } from 'antd'
import Menu from '../menu/menu'
import Header from '../header/Header'
import { DisplayFlex } from '../styles/display.styled'
import { useButtonMenuCollapsedReducer } from '../../../store/reducers/buttonMenuCollapsedReducer/buttonMenuCollapsedReducer'
import { useScreenSizeReducer } from '../../../store/reducers/screenSizeReducer/useScreenSizeReducer'

interface ScreenProps {
  children: React.ReactNode
  listBreadcrumb?: ListBreadcrumb[]
}

const Screen = ({ children, listBreadcrumb }: ScreenProps) => {
  const { buttonMenuActivate, setButtonMenuCollapsed } = useButtonMenuCollapsedReducer()
  const { screenSize, setScreenSize } = useScreenSizeReducer()

  useEffect(() => {
    setScreenSize(window.innerWidth)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenSize?.isMobile) {
      setButtonMenuCollapsed(true)
    }
  }, [screenSize?.isMobile])

  return (
    <>
      <Header />
      <DisplayFlex>
        <Menu />
        <ScreenContainer buttonCollapsed={buttonMenuActivate}>
          {listBreadcrumb && (
            <>
              <Breadcrumb listBreadcrumb={listBreadcrumb} />
              <Divider />
            </>
          )}
          {children}
        </ScreenContainer>
      </DisplayFlex>
    </>
  )
}

export default Screen
