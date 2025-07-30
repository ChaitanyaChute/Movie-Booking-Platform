import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv"
import Jwt, { JwtPayload }  from "jsonwebtoken";

dotenv.config()

export const authM = (req:Request , res:Response , next:NextFunction)=>{
    const token = req.headers.token;
    const decoded = Jwt.verify(token as string ,process.env.JWT_SECRET as string)


    if(decoded){
        //@ts-ignore
        req.userId = (decoded as JwtPayload).id;
        next()
    }
}