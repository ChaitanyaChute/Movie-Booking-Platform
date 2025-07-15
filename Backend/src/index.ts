import express,{ Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose  from "mongoose";
import userModel from "./userModel";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();
const Port = process.env.Port || 3000;

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGOdb_URL || "");

app.post("/" , async(req:Request,res:Response)=>{
    
    interface userInput {
        username:string,
        password:string
        
    }
    const{username , password }=req.body as userInput;

    const existing = await userModel.findOne({username})
    try {
        const Hashedpass = await bcrypt.hash(password , 10);

    await userModel.create({
        username,
        password:Hashedpass
    })
    res.json({
        message:"Account Created Sucessfully",
        Username : username
    })
    } catch (error) {
        res.json("Error in Auth")
        
    } 
    
})

app.post("/login" , async(req , res)=>{
    
    const{username , password }=req.body ;

    const match = await userModel.findOne({
        username 
    })
    

    if(match){
        const token = jwt.sign({
            id :match._id
        },process.env.JWT_SECRET || "")

        res.status(200).json({
            message:"You are Signed up sucessfully.",
            token:token
        })
    }
    else{
        res.status(404).json({
            message:"Invalid Credentials"
        })
    }
})



app.listen(Port);
