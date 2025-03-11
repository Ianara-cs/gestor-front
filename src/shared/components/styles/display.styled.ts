import styled from 'styled-components'

interface DisplayFlexProps {
  margin?: string
}

export const DisplayFlex = styled.div`
  display: flex;
`

export const FlexJustifyRight = styled(DisplayFlex)<DisplayFlexProps>`
  justify-content: right;
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`

export const FlexJustifyLeft = styled(DisplayFlex)<DisplayFlexProps>`
  justify-content: left;
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`

export const FlexJustifyBetween = styled(DisplayFlex)<DisplayFlexProps>`
  justify-content: space-between;
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`

export const FlexJustifyCenter = styled(DisplayFlex)<DisplayFlexProps>`
  justify-content: center;
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`

export const FlexAlignItemsCenter = styled(DisplayFlex)<DisplayFlexProps>`
  align-items: center;
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`
