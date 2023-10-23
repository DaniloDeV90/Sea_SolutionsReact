import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Setor from "./pages/Setor/Setor"
function App() {
  const [count, setCount] = useState(0)

  return (

  
    <BrowserRouter>
    
    <Routes>


      <Route path='/' element={<Setor/>} />
    </Routes>
    
    </BrowserRouter>

  )
}

export default App
