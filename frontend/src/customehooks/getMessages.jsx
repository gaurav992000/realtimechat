import axios from "axios"
import { useEffect } from "react"
import { serverurl } from "../main"
import { setotheruser, setselecteduser, setUserData } from "../redux/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageslice"


const getMessages=()=>{
    let dispatch=useDispatch()
    let{userData,selecteduser}=useSelector(state=>state.user)
    console.log(selecteduser?._id);
    
    useEffect(()=>{
        const fetchMessage=async()=>{
            // Only fetch messages if selecteduser exists and has an _id
            if (!selecteduser?._id) {
                return;
            }
            
            try{
                let result =await axios.get(`${serverurl}/api/message/get/${selecteduser._id}`,{withCredentials:true})
                console.log(result);
                

                dispatch(setMessages(result.data))
            }
            catch(error){
                console.log(error);
                

            }

           
        }

         fetchMessage()
    },[selecteduser, userData])
}


export default getMessages