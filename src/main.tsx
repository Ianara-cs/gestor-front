import { createRoot } from 'react-dom/client'
import './main.css'
import { GlobalProvider } from './shared/hooks/useGlobalContext.tsx'
import App from './App.tsx'
import {DataProvider} from './shared/hooks/useDataContext.tsx'


createRoot(document.getElementById('root')!).render(
    <GlobalProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </GlobalProvider>    
)
