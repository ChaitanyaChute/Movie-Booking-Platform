import express, { Request, Response } from "express";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const Userrouter = express.Router();


Userrouter.post("/signup" , async(req:Request,res:Response)=>{
    
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

Userrouter.post("/login" , async(req , res)=>{
    
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

export default Userrouter;