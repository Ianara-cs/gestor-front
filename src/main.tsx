import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import '@ant-design/v5-patch-for-react-19'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
