import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Contexto_DataProvider } from './context/contextoFunciones';
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Contexto_DataProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Contexto_DataProvider>
  </React.StrictMode>,
)
