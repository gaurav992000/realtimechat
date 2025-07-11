import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authRouter from "./routes/authroutes.js";
import cookieParser from "cookie-parser";
dotenv.config()
import cors from 'cors'
import userRouter from "./routes/userrotes.js";
import messaageRouter from "./routes/messageroutes.js";
import { app, server } from "./socket/socket.js";
const port =process.env.PORT || 6000



app.use(cors({
    origin: 'https://realtimechat-ylxp.onrender.com', // Frontend URL
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messaageRouter)





server.listen(port,()=>{
    connectdb()
    console.log(`server start at ${port}`);
    
})
