import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv"
import Jwt, { JwtPayload }  from "jsonwebtoken";

dotenv.config()

export const authM = (req:Request , res:Response , next:NextFunction)=>{
    try {
        const token = req.headers.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "No token provided" 
            });
        }

        const decoded = Jwt.verify(token as string, process.env.JWT_SECRET as string);

        if(decoded){
            //@ts-ignore
            req.userId = (decoded as JwtPayload).id;
            next()
        } else {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token" 
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ 
            success: false, 
            message: "Authentication failed" 
        });
    }
}