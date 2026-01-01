import express from "express"
import { authM } from "../middleware/auth";
import { adminM } from "../middleware/admin";
import userModel from "../models/usermodel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getBookingStats, getAllBookings } from "../controllers/booking.controller";

const adminRouter = express.Router();

adminRouter.post("/login" , async(req , res)=>{
    
    const{username , password }=req.body ;

    const match = await userModel.findOne({
        username, 
        isAdmin:true
    })

    if (!match) {
    return res.status(404).json({ message: "Admin user not found" });
    }
       
    const passwordMatch = await bcrypt.compare(password,match!.password)

    if(passwordMatch){
        const token = jwt.sign({
            id :match!._id,
            isAdmin:true
        },process.env.JWT_SECRET || "")

        res.status(200).json({
            message:"Admin logged in successfully.",
            token:token,
            isAdmin:true
        })
    }
    else{
        res.status(404).json({
            message:"Invalid Credentials"
        })
    }
})

// Get admin dashboard statistics (protected route)
adminRouter.get("/stats", adminM, getBookingStats);

// Get all bookings (protected admin route)
adminRouter.get("/bookings", adminM, getAllBookings);

export default adminRouter