import {IoCameraOutline} from "react-icons/io5"
import { useSelector } from "react-redux"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export function Profile(){

    let{userData}=useSelector(state=>state.user)
    console.log(userData);
    let navigate=useNavigate()
    let[name,setName]=useState(userData.name || "")
    let[frontendImage,setFrontendImage]=useState(userData.image )
    let[backendImage,setBackendImage]=useState(null)
let image=useRef()

const handelImage=(e)=>{
    let file =e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))


}


    return(

        
        <div className="w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]">

<div className="fixed top-[20px] left-[20px] cursor-pointer" onClick={()=>navigate("/")}>
    <FaArrowLeftLong className="w-[30px] h-[50px] text-gray-600" />
</div>

            <div className="w-[200px] h-[200px] bg-white rounded-full border-4 border-[#20c7ff] shadow-gray-400 shadow-lg relative" onClick={()=>image.current.click()}>
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                    <img src={frontendImage} className="h-[100%]"/>
                </div>
                <IoCameraOutline className="absolute bottom-4 text-gray-700 right-5 w-[28px] h-[28px] "/>

               

            </div>
            <form className="w-[95] max-w-[500px] flex flex-col gap-[20px] items-center justify-center" >
                <input type="file" accept='image/*' hidden ref={image} onChange={handelImage}/>
                <input type="text" placeholder="enter your name" className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px] " onChange={(e)=>setName(e.target.value)} value={name}/>

                <input type="text"  className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg  " value={userData.username}/>
                
                <input type="email" readOnly className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg " value={userData.email}/>

                <buton className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner">Save profile</buton>
            </form>
           
        </div>
    )
}