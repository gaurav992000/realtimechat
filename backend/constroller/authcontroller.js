import express from "express"
import User from "../models/usermodel.js"
import genToken from "../config/token.js"
import bcrypt from "bcryptjs"


 export const signup=async(req,res)=>{
    try{
        const {username,email,password}=req.body
     const checkusername=await User.findOne({username})
     if(checkusername){
        return res.status(400).json({message:"username already exists"})
     }

     const checkemail=await User.findOne({email})
     if(checkemail){
        return res.status(400).json({message:"email already exists"})
     }

     if(password.length<6){
        return res.status(400).json({message:"password must be 6 length"})
     }

     const hashedPassword=await bcrypt.hash(password,10)

     const user=await User.create({
        username,
        email,
        password:hashedPassword
     })

     const token=await genToken(user._id)

     res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"Strict",
        secure:false
     })

     return res.status(200).json({user, token})



    }
    catch(error){
        return res.status(500).json({
            message:`signup error ${error} `
        })

    }

}



 export const login=async(req,res)=>{
    try{
        const {email,password}=req.body
     

      const user=await User.findOne({email})
     if(!user){
        return res.status(400).json({message:"user does not already exist"})
     }

     const isMatch=await bcrypt.compare(password,user.password)


     if(!isMatch){
        return res.status(400).json({message:"incorrect password"})
     }



     const token=genToken()

     res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"Strict",
        secure:false
     })

     return res.status(200).json(user)



    }
    catch(error){
        return res.status(500).json({
            message:`login error ${error} `
        })

    }

}






export const logout=async(req,res)=>{
try{
    res.clearCookie("token")
    return res.status(200).json({message:"logout successfull"})
}
catch(e){
    return res.json({message:"logout error"})
}
}










