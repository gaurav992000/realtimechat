

import {createSlice} from "@reduxjs/toolkit"


const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherusers:null,
        selecteduser:null
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
    }
})

export const {setUserData,setotheruser,setselecteduser}=userSlice.actions
export default userSlice.reducer
