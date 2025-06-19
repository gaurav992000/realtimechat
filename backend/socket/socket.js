import http from "http"

import express from "express"
import { Server } from "socket.io"

 let app=express()
 const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})
export const getReceiversocketid=(receiver)=>{
    return userSocketMap[receiver]
}

export const userSocketMap={}

io.on("connection",(socket)=>{
    
const userId=socket.handshake.query.userId
if(userId!=undefined){
    console.log(userId);
    userSocketMap[userId]=socket.id
    
}
io.emit("getonlineUsers",Object.keys(userSocketMap))

    socket.on("dissconnect",()=>{
        delete userSocketMap[userId ]
         io.emit("getonlineUsers",Object.keys(userSocketMap))

    })
    

})

 export{app,server,io}