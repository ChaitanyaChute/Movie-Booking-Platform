import express, { Request, Response } from "express";
import userModel from "../models/usermodel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";


const Userrouter = express.Router();


Userrouter.post("/signup" , async(req:Request,res:Response)=>{
    
    interface userInput {
        username:string,
        password:string,
        isAdmin?:boolean
        
    }
    const{username , password,isAdmin }=req.body as userInput;

    const existing = await userModel.findOne({username})
    try {
        const Hashedpass = await bcrypt.hash(password , 10);

    await userModel.create({
        username,
        password:Hashedpass,
        isAdmin:isAdmin || false
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
    
    const passwordMatch = await bcrypt.compare(password,match!.password)

    if(passwordMatch){
        const token = jwt.sign({
            id :match!._id,
            isAdmin: match!.isAdmin || false
        },process.env.JWT_SECRET || "")

        res.status(200).json({
            message:"You are Signed up sucessfully.",
            token:token,
            isAdmin: match!.isAdmin || false
        })
    }
    else{
        res.status(404).json({
            message:"Invalid Credentials"
        })
    }
})

// Verify user token and return user info including isAdmin status
Userrouter.get("/verify", async(req, res) => {
    try {
        const token = req.headers.token as string;
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as jwt.JwtPayload;
        const user = await userModel.findById(decoded.id).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({
            userId: user._id,
            username: user.username,
            isAdmin: user.isAdmin
        });
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
});

export default Userrouter;