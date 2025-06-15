import { Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Login } from './pages/login'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'

import { useSelector } from 'react-redux'
import getCurrentUser from './customehooks/getcurrent'
import getotheruser from './customehooks/getotheruser'

function App() {
    getCurrentUser() 
    getotheruser()// Call the function
    const { userData } = useSelector(state => state.user)
    
    return (
        <Routes>
            <Route path="/login" element={!userData ? <Login/> : <Navigate to="/"/>}/>
            <Route path="/signup" element={!userData ? <Signup/> : <Navigate to="/profile"/>}/>
            <Route path='/' element={userData ? <Home/> : <Navigate to="/login"/>} />
            <Route path="/profile" element={userData?<Profile/>:<Navigate to="/signup"/>}/>
        </Routes>
    )
}

export default App
