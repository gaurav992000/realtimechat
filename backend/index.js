import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authRouter from "./routes/authroutes.js";
import cookieParser from "cookie-parser";
dotenv.config()
import cors from 'cors'
import userRouter from "./routes/userrotes.js";
const port =process.env.PORT || 6000


const app=express()
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)





app.listen(port,()=>{
    connectdb()
    console.log(`server start at ${port}`);
    
})