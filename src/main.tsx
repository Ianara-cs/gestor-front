import { createRoot } from 'react-dom/client'
import './main.css'
import { GlobalProvider } from './shared/hooks/useGlobalContext.tsx'
import App from './App.tsx'
import {DataProvider} from './shared/hooks/useDataContext.tsx'
import '@ant-design/v5-patch-for-react-19';


createRoot(document.getElementById('root')!).render(
    <GlobalProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </GlobalProvider>    
)
