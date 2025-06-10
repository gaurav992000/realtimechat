import express from "express"
import  {signup, login, logout } from "../constroller/authcontroller.js"
import isAuth from "../middlewares/auth.js"
import { editProfile, getcurrentuser } from "../constroller/usercontroller.js"
import multer from "multer"
import { upload } from "../middlewares/multer.js"


const userRouter=express.Router()



userRouter.get("/current",isAuth,getcurrentuser)

userRouter.put("/profile",isAuth,upload.single("image"),editProfile)

export default userRouter

