import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './axiosGlobals/axiosGlobals.js'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserProvider from './contextApi/UserProvider.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </QueryClientProvider>
    </UserProvider>
  </StrictMode>,
)
