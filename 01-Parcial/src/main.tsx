import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Pacientes from './Componentes/Pacientes'
import Medico from './Componentes/Medico'
import Comite from './Componentes/Comite'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Pacientes/>
    <Medico/>
    <Comite/>
  </StrictMode>,
)
