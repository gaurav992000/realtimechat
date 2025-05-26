
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Login } from './pages/login'

function App() {
  

  return (
  <Routes>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup/>}/>
  </Routes>
   

    
  )
}

export default App
