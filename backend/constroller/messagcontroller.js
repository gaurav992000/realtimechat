import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversationmodel.js";
import Message from "../models/messagemodel.js";
import { getReceiversocketid } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage=async(req,res)=>{
    try {
        let sender=req.userId
        let{receiver}=req.params
        let {message}=req.body

        let image;

        if(req.file){
            image= await uploadOnCloudinary(req.file.path)
        }
        let conversation=await Conversation.findOne({
            partcipants:{$all:[sender,receiver]}
        })// if the conversation happend before

        let newmessage=await Message.create({
            sender,receiver,message,image
        })


        if(!conversation){
            conversation=await Conversation.create({
                partcipants:[sender,receiver],
                message:[newmessage._id]
            })
        }else{
            conversation.message.push(newmessage._id)
            conversation.save()
        }

        const receiversocketid=getReceiversocketid(receiver)
        if(receiversocketid){
            io.to(receiversocketid).emit("newMessage",newmessage)
        }


        return res.status(201).json(newmessage)




    } catch (error) {
        return res.status(500).json({message:`send Message error ${error}`})
        
    }
}



export const getMessage=async (req , res)=>{
    try {
        let sender=req.userId
        let{receiver}=req.params
          let conversation=await Conversation.findOne({
            partcipants:{$all:[sender,receiver]}
        }).populate("message")
        if(!conversation){
            return res.status(400).json({message:"conversation not found"})
        }

        return res.status(200).json(conversation?.message)

        
    } catch (error) {


        return res.status(500).json({message:`send Message error ${error}`})
    }
}