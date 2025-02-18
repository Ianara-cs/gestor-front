import styled from 'styled-components'

interface DisplayFlexProps {
  margin?: string
}

export const DisplayFlex = styled.div`
  display: flex;
`

export const DisplayFlexJustifyRight = styled(DisplayFlex)`
  justify-content: right;
`

export const FlexJustifyBetween = styled(DisplayFlex)<DisplayFlexProps>`
  justify-content: space-between;
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`

export const FlexJustifyCenter = styled(DisplayFlex)<DisplayFlexProps>`
  justify-content: center;
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`
