import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import messageSlice  from "./messageslice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        message:messageSlice
    }
})