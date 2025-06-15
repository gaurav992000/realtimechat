import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/usermodel.js"

  export const getcurrentuser=async(req,res)=>{
    try{
        let userId=req.userId
        let user= await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    }catch(e){
        return res.status(500).json({message:`current user error${e}`})

    }
  }

  export const editProfile=async(req,res)=>{
    try{
      let{name}=req.body
      let image;
      if(req.file){
        image= await uploadOnCloudinary(req.file.path)
        console.log(image);
        
      }

      let user=await User.findByIdAndUpdate(req.userId,{name,image},{new:true})

      if(!user){
        return res.status(400).json({message:"user not found"})
      }
      return res.status(200).json(user)
    
      

    }catch(error){
      return res.status(500).json({message:`profile error ${error}`})

    }
  }


  export const getotheruser=async(req,res)=>{
    try{
      let users=await User.find({_id:{$ne:req.userId}}).select("-password")

      return res.status(200).json(users)

    }
    catch(error){
return res.status(500).json({message:`get other users ${error}`})
    }
  }
