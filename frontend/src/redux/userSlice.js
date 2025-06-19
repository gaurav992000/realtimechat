

import {createSlice} from "@reduxjs/toolkit"


const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherusers:null,
        selecteduser:null,
        socket:null,
        onlineusers:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload

        },
         setotheruser:(state,action)=>{
            state.otherusers=action.payload

        },
        setselecteduser:(state,action)=>{
            state.selecteduser=action.payload
        }
        ,
        setsocket:(state,action)=>{
            state.socket=action.payload
        },
        
        setonlineuser:(state,action)=>{
            state.onlineusers=action.payload
        }
    }
})

export const {setUserData,setotheruser,setselecteduser,setonlineuser,setsocket}=userSlice.actions
export default userSlice.reducer
