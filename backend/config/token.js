import jwt from "jsonwebtoken"
const genToken=async(userId)=>{
    try{
        const token=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})

        return token
    }
    catch(e){
        console.log("token error");
        
    }
}

export default genToken