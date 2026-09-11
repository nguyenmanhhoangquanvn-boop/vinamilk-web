import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Tắt console errors khi dev
if (import.meta.env.DEV) {
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes("ERR_CONNECTION_REFUSED")) return;
    if (args[0]?.message?.includes("ERR_CONNECTION_REFUSED")) return;
    originalError(...args);
  };
}

createRoot(document.getElementById('root')).render(
  <App />
  ,
)