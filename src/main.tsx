import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import '@ant-design/v5-patch-for-react-19'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './shared/functions/connection/connectionGraphQL.ts'

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
)
