import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { serverurl } from "../main"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"


export function Signup() {
    const [show,setshow]=useState(false)
    let dispatch=useDispatch()
    console.log(dispatch);
    
   

    let navigate=useNavigate()
let [username,setusername]=useState("")
let [email,setemail]=useState("")
let[password,setpassword]=useState("")
const handlerSingnUp=async(e)=>{
    e.preventDefault()
   
    try{
        let result=await axios.post(`${serverurl}/api/auth/signup`,{
            username,
            email,
            password

        },{withCredentials:true})
        console.log(result);
         dispatch(setUserData(result.data))
         setemail("")
        setpassword("")
        setusername("")
        

    }catch(e){
        console.log(e);
        

    }
}

    return (
        <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
            <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col gap-[30px]">

                <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-lg flex items-center justify-center">
                    <h1 className="text-gray-600 font-bold text-[30px]">welcome to <span className="text-white">chatly</span></h1>
                </div>
                <form className="w-full flex flex-col gap-[20px] items-center" onSubmit={handlerSingnUp}>
                    <input type="text" placeholder="username" className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg" onChange={(e)=>setusername(e.target.value)} value={username}></input>

                    <div className="w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative">

                    <input type={show?"password":"text"}  
                    placeholder="password" className="w-[90%] h-[50px] outline-none  px-[20px] py-[10px] bg-[white] rounded-lg shadow-lg" onChange={(e)=>setpassword(e.target.value)} value={password} />
                    <span className="absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] font-semibold cursor-pointer" onClick={()=>{setshow(privous=>!privous)}}>{`${show?"hidden":"show"}`}</span>
</div>
                    <input type="email"    placeholder="email" className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg" onChange={(e)=>setemail(e.target.value)} value={email} />


                    <button className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner"> Signup</button>
                    <p className="cursor-pointer "onClick={()=>navigate("/login")}>Already have an account ? <span className="text-[#20c7ff] text-[bold]">Login</span> </p>
                </form>

            </div>


        </div>
    )
}