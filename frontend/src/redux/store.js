
import configureStore from "@reduxjs/toolkit" 
import reducer from "./userSlice"
import userSlice from "./userSlice"
export const store=configureStore({
    reducer:{
        user:userSlice
    }
})