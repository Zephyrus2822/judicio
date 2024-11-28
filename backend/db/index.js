import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb=async()=>{
    try {
        const connectionHost=await mongoose.connect(`${process.env.MONGODB_URL}/JUDICIOTEST`)
        if(connectionHost){
            console.log("Mongoose connection Successfull",connectionHost.connection.host)
        }
        
    } catch (error) {
        console.error('Mongodb conncetion error',error)
        process.exit(1)
    }
}