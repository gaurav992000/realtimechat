import axios from "axios"
import { useEffect } from "react"
import { serverurl } from "../main"
import { setotheruser, setUserData } from "../redux/userSlice"
import { useDispatch, useSelector } from "react-redux"


const getotheruser=()=>{
    let dispatch=useDispatch()
    let{userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                let result =await axios.get(`${serverurl}/api/user/others`,{withCredentials:true})
                console.log(result);
                

                dispatch(setotheruser(result.data))
            }
            catch(error){
                console.log(error);
                

            }

           
        }

         fetchUser()
    },[userData])
}


export default getotheruser