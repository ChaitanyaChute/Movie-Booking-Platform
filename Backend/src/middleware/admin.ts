import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv"
import Jwt, { JwtPayload }  from "jsonwebtoken";
import userModel from "../models/usermodel";

dotenv.config()

export const adminM = async (req:Request , res:Response , next:NextFunction)=>{
    const token = req.headers.token;
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    
    try {
        const decoded = Jwt.verify(token as string ,process.env.JWT_SECRET as string) as JwtPayload;
        
        if(decoded){
            // Verify user exists and is an admin
            const user = await userModel.findById(decoded.id);
            
            if(!user){
                return res.status(404).json({message:"User not found"});
            }
            
            if(!user.isAdmin){
                return res.status(403).json({message:"Access denied. Admin privileges required."});
            }
            
            //@ts-ignore
            req.userId = decoded.id;
            next();
        }
    } catch (error) {
        return res.status(403).json({message:"Invalid or expired token"})
    }
}