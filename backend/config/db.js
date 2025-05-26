import mongoose from "mongoose"

 const connectdb = async ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("DB CONNCECTED");
        

    }catch(e){
        console.log("connection failed");
        

    }
}

export default connectdb