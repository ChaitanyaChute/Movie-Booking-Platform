import { config } from "dotenv";
import mongoose from "mongoose";

config();

export const dbconnect = async()=> {
    try{
        const connect = await mongoose.connect(process.env.MONGOdb_URL || "")
        console.log("Database Connected");
        
    }catch(error){
        console.log("Error in Connecting database" , error)
    }
}