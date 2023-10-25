

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Setor from "./pages/Setor/Setor"
function App() {


  return (

  
    <BrowserRouter>
    
    <Routes>


      <Route path='/' element={<Setor/>} />
    </Routes>
    
    </BrowserRouter>

  )
}

export default App
