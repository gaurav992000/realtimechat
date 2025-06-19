import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setselecteduser } from "../redux/userSlice";
import { RiEmojiStickerFill } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from "./sender";
import Recivermessage from "./receivermessage";
import { useRef } from "react";
import axios from"axios"
import { serverurl } from "../main";
import { setMessages } from "../redux/messageslice";
import { useEffect } from "react";


function MessageArea() {

  let{messages}=useSelector(state=>state.message)
    let {selecteduser,userData,socket}=useSelector(state=>state.user)
    let dispatch =useDispatch()
    let[showPicker,setshowPicker]=useState(false)
let [input,setInput]=useState("")
let[frontendImage,setfrontendImage]=useState("")
let[backendImage,setbackendImage]=useState("")

let image=useRef()
//handelimages 
const handleSendMessage=async (e)=>{
  e.preventDefault()
  if(input.length==0 && backendImage==null){
    return null
  }

try {
  let formData=new FormData()
formData.append("message",input)
if(backendImage){
  formData.append("image",backendImage)
}

  let result=await axios.post(`${serverurl}/api/message/send/${selecteduser._id}`,formData,{ withCredentials:true})
  console.log(result.data);
  
  dispatch(setMessages([...messages,result.data]))
  setInput("" )
    setbackendImage(null)
    setfrontendImage(null)
 
  
  
} catch (error) {
  console.log(error);
  
  
}


}


  const onEomjiClicker=(emojiData)=>{
    setInput(prev=>prev+emojiData.emoji)

  }
  const handelImage=(e)=>{
    let file=e.target.files[0]
    setbackendImage(file)
    setfrontendImage(URL.createObjectURL(file))

  }


useEffect(()=>{
  socket.on("newMessage",(mess)=>{
    dispatch(setMessages([...messages,mess]))
  })

  return ()=>socket.off("newMessage")

},[messages,setMessages])

  return (
    <div className={`lg:w-[70%] ${selecteduser?"flex":"hidden"}  lg:flex w-full h-full bg-slate-200 border-1-2 border-gray-300`}>
     
     {selecteduser && 
     <div className="w-full h-[100vh] flex flex-col">
      <div className="w-full h-[100px] bg-[#20c7ff] rounded-b-[30px] shadow-lg flex items-center  px-[20px] gap-2">
        <div className=" cursor-pointer" onClick={()=>dispatch(setselecteduser(null))}>
          <FaArrowLeftLong className="w-[30px] h-[30px] text-white" />
        </div>
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center bg-white shadow-gray-500 shadow-lg  cursor-pointer">
            <img src={selecteduser?.image || ""} className="h-[100%]" />
          </div>
<h1 className="text-white font-semibold text-[20px]">{selecteduser?.name|| "user"}</h1>

      </div>
      <div className="w-full h-[70%] flex flex-col py-[30px] px-[20px] overflow-auto " >
        {showPicker && <div  className=" absolute bottom-[100px] left-[20px] ">
                <EmojiPicker width={250} height={350} className="shadow-lg z-[100]" onEmojiClick={onEomjiClicker}/>
                </div>
            
        }
        {messages && messages
          .filter(mess =>
            (mess.sender === userData._id && mess.receiver === selecteduser._id) ||
            (mess.sender === selecteduser._id && mess.receiver === userData._id)
          )
          .map(mess =>
            mess.sender === userData._id
              ? <SenderMessage key={mess._id} image={mess.image} message={mess.message}/>
              : <Recivermessage key={mess._id} image={mess.image} message={mess.message}/>
          )
        }
        

      </div>
      </div>
      }

      {!selecteduser && <div className="w-full h-full flex flex-col items-center justify-center">
        <h1  className="text-gray-700 font-bold text-[50px]">welcome to chatly</h1>
        <span className="text-gray-700 font-semibold text-[30px]"> chat friendly!</span>

        </div>}

        {selecteduser && <div className="w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center">

{/** image in the chat */}
{frontendImage?(<img src={frontendImage} alt="" className="w-[80px] absolute bottom-[100px] right-[20%] rounded-lg shadow-gray-400 shadow-lg"/>):null}
              

            <form className="w-[95%] lg:w-[70%] max-w-[75%] h-[60px] bg-[rgb(23,151,194)] shadow-gray-400 shadow-lg rounded-full flex items-center gap-[20px] px-[20px]" onSubmit={handleSendMessage}>

                 <div onClick={()=>setshowPicker(prev=>!prev)}>


                    <RiEmojiStickerFill className=" w-[25px] h-[25px] cursor-pointer text-white " />
                 </div>
                { /*taking image from image icon*/}
                 <input type="file" accept="image/*" hidden ref={image} onChange={handelImage}/>
                
                    <input type="text" className="w-full h-full bg-transparent placeholder-white" placeholder="Message" onChange={(e)=>setInput(e.target.value)} value={input}/>
                 

                 
                 <div onClick={()=>image.current.click()}>
                    <CiImageOn className=" w-[25px] h-[25px] cursor-pointer text-white" />
                 </div>
                 {input.length>0 || backendImage!=null && <button>
                    <IoMdSend className=" w-[25px] h-[25px] cursor-pointer text-white"/>

                 </button>}
                

            </form>
           
        </div> }

        
     
    </div>
  );
}

export default MessageArea;
