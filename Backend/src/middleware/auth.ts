import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload }  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const AuthMiddleware = (req:Request , res:Response , next : NextFunction)=>{
    const token = req.headers.token;
    const decoded = Jwt.verify(token as string ,process.env.JWT_SECRET)

    if(decoded){
        req.userId = (decoded as JwtPayload).id;
        next()
    }
    
}

export default AuthMiddleware;