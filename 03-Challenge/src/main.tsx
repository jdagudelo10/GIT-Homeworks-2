import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Songs from './Songs'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Songs />
  </StrictMode>,
)
