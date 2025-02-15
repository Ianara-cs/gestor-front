import React from "react"
import { ScreenContainer } from "./screen.style"
import Breadcrumb, { ListBreadcrumb } from "../breadcrumb/Breadcrumb";
import { Divider } from "antd";


interface ScreenProps {
  children: React.ReactNode
  listBreadcrumb?: ListBreadcrumb[];
}

const Screen = ({children, listBreadcrumb}: ScreenProps) => {
  return (
    <ScreenContainer>
      {listBreadcrumb && 
        <>
          <Breadcrumb listBreadcrumb={listBreadcrumb} />
          <Divider/>
        </>
      }
      {children}
    </ScreenContainer>
  )
}

export default Screen