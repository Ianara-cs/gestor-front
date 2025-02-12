import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import { GlobalProvider } from './shared/hooks/useGlobalContext.tsx'
import App from './App.tsx'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
)
