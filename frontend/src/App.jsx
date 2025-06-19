import { Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Login } from './pages/login'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'

import { useDispatch, useSelector } from 'react-redux'
import getCurrentUser from './customehooks/getcurrent'
import getotheruser from './customehooks/getotheruser'
import { useEffect } from 'react'
import{io} from "socket.io-client"
import { serverurl } from './main'
import { setonlineuser, setsocket } from './redux/userSlice'

function App() {
    getCurrentUser() 
    getotheruser()// Call the function
    const { userData,socket,onlineusers } = useSelector(state => state.user)
    let dispatch=useDispatch()
    useEffect(()=>{
if(userData){

      const socketio=io(`${serverurl}`,{
            query:{
                userId:userData?._id
            }
        })

        dispatch(setsocket(socketio))

        socketio.on("getonlineUsers",(users)=>{
            dispatch(setonlineuser(users))
        })

        return ()=>socketio.close()

}
else{
    if(socket){
        socket.close()
        dispatch(setsocket(null))
    }
}

      

    },[userData])
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
