
import { useEffect,useRef } from 'react'
import dp from '../assets/dp.png'
function Recivermessage({image,message}){
    let scroll=useRef()
    useEffect(()=>{
        scroll?.current.scrollIntoView({behaviour:"smooth"})

    },[message,image])

    const handelImageScroll=()=>{
         scroll?.current.scrollIntoView({behaviour:"smooth"})
    }
    return(
        <div className="w-fit max-w-[500px] px-[20px] py-[5px] bg-[rgb(23,97,194)] text-white text-[19px] rounded-tl-none rounded-2xl relative right-0  gap-[10px] flex flex-col" >

            <div ref={scroll} >
                 {image &&  <img src={image}alt="" className="w-[150px] rounded-lg " onLoad={handelImageScroll}/>}
           {message && <span>{message}</span>}
            </div>
             
            

            
        </div>
    )
}


export default Recivermessage