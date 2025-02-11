import styled from 'styled-components'

export const ContainerLoginScreen = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: linear-gradient(135deg, #6e8efb, #a777e3);
`

export const LoginBox = styled.div`
  width: 300px;
  background-color: white;
  padding: 2rem;
  border-radius: 0.4rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`

export const Input = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  font-size: 1rem;
  padding: 0.8rem;
  margin: 0.5rem 0;
`
