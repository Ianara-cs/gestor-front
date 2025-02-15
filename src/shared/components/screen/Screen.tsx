import React from "react"
import { ScreenContainer } from "./screen.style"
import Breadcrumb, { ListBreadcrumb } from "../breadcrumb/Breadcrumb";


interface ScreenProps {
  children: React.ReactNode
  listBreadcrumb?: ListBreadcrumb[];
}

const Screen = ({children, listBreadcrumb}: ScreenProps) => {
  return (
    <ScreenContainer>
      {listBreadcrumb && <Breadcrumb listBreadcrumb={listBreadcrumb} />}
      {children}
    </ScreenContainer>
  )
}

export default Screen