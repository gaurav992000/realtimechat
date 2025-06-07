
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Login } from './pages/login'
import getCurrentUser from './customehooks/getcurrent'
import { useSelector } from 'react-redux'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'

function App() {
  
getCurrentUser()

let {userData}=useSelector(state=>state.user)
  return (
  <Routes>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={!userData?<Signup/>:<Navigate to="/profile"/>}/>
     <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>} />

     <Route path="/profile" element={userData?<Profile/>:<Navigate to="/signup"/>}/>
     
     
  </Routes>
   

    
  )
}

export default App
