import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContexShare from './Context API/ContexShare.jsx'
import TokenAuth from './Context API/TokenAuth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenAuth>
    <ContexShare>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ContexShare>
    </TokenAuth>
  </StrictMode>,
)
