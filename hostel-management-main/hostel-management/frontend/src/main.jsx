import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '10px',
        },
        success: {
          style: {
            background: '#059669',
          },
        },
        error: {
          style: {
            background: '#DC2626',
          },
        },
      }}
    />
    <App />
  </StrictMode>,
)
