import User from "../models/usermodel"

  export const getcurrentuser=async(req,res)=>{
    try{
        let userId=req.userId
        let user=User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    }catch(e){
        return res.status(500).json({message:`current user error${error}`})

    }
  }