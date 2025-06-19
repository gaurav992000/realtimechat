import express from "express"

import isAuth from "../middlewares/auth.js"

import { upload } from "../middlewares/multer.js"

import { getMessage, sendMessage } from "../constroller/messagcontroller.js"


const messaageRouter=express.Router()
 



messaageRouter.post("/send/:receiver",isAuth,upload.single("image"),sendMessage)


messaageRouter.get("/get/:receiver",isAuth,getMessage)

export default messaageRouter

