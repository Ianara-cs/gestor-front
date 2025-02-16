import { Breadcrumb as BreadcrumbAnt } from 'antd'
import { Link, useNavigate } from 'react-router'

export interface ListBreadcrumb {
  title: string
  href?: string
}

interface BreadcrumbProps {
  listBreadcrumb?: ListBreadcrumb[]
}

const Breadcrumb = ({ listBreadcrumb }: BreadcrumbProps) => {
  return <BreadcrumbAnt items={listBreadcrumb} />
}

export default Breadcrumb
