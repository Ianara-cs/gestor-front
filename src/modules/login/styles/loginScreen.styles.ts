import styled from 'styled-components'
import { Button } from 'antd'

export const ContainerLoginScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 1rem;
`

export const LoginBox = styled.div`
  width: 100%;
  max-width: 360px;
  background-color: white;
  padding: 2rem;
  border-radius: 0.6rem;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: 420px) {
    padding: 1.5rem;
  }
`

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
`

export const Input = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  font-size: 1rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #6e8efb;
    box-shadow: 0 0 0 2px rgba(110, 142, 251, 0.2);
  }

  &:hover {
    border-color: #a777e3;
  }
`

export const StyledButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
  height: 40px;
  font-weight: 500;
`
