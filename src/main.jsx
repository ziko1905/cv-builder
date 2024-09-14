import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CreationInput } from './components/inputPrompt.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CreationInput />
  </StrictMode>,
)
