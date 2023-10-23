import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { SetoresProvider } from './context/ContextSetores.tsx'
import { PaginaProvider } from './context/ContextPag.tsx'
import { OpcaoDeleteProvider } from './context/ContextBotaoExcluir.tsx'
import { CargosProvider } from './context/ContextTrabalhoCargo.tsx'
import { TrabalhadorProvider } from './context/TrabalhadorContext.tsx'
import { OpcaoUpdateProvider } from './context/ContextBotaoEditar.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OpcaoDeleteProvider>
      <SetoresProvider>
        <PaginaProvider>
          <CargosProvider>
            <TrabalhadorProvider>
              <OpcaoUpdateProvider>
              <App />
              </OpcaoUpdateProvider>

       
            </TrabalhadorProvider>
          </CargosProvider>
        </PaginaProvider>
      </SetoresProvider>
    </OpcaoDeleteProvider>


  </React.StrictMode>,
)
