import { Card as CardAnt, CardProps as CardAntProps } from "antd"
import Meta, { CardMetaProps } from "antd/es/card/Meta"

interface BaseCardProps extends CardAntProps {
  children?: React.ReactNode
}

interface MetaCardProps extends BaseCardProps {
  typeCard: "Meta";
  metaProps: CardMetaProps;
}

interface NormalCardProps extends BaseCardProps {
  typeCard?: never;
  metaProps?: never;
}

type CardProps = MetaCardProps | NormalCardProps;

const Card = ({ children, typeCard, metaProps, ...props}: CardProps) => {
  return <CardAnt {...props} >
    {children}
    {
      typeCard == 'Meta' && 
      <Meta {...metaProps}/>
    }
  </CardAnt>
}

export default Card