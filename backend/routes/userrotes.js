import express from "express"
import  {signup, login, logout } from "../constroller/authcontroller.js"
import isAuth from "../middlewares/auth.js"
import { getcurrentuser } from "../constroller/usercontroller.js"


const userRouter=express.Router()



userRouter.get("/current",isAuth,getcurrentuser)

export default userRouter

