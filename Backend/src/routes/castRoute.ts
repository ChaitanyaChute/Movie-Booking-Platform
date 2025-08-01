import express, { Request, Response } from "express";
import cloudinary from "../libs/cloudinary";
import CastModel from "../models/castmodel";



const castRouter = express.Router();

castRouter.post("/upload" ,async(req:Request ,res:Response)=>{
    try {
        const {name , profile_pic} = req.body;

    let profile_path;
    if(profile_pic){
        const profile_upload = await cloudinary.uploader.upload(profile_pic);
        profile_path = profile_upload.secure_url; 
    }

    await CastModel.create({
        name:name,
        profile_pic:profile_path
    })

    res.json({
        message:"cast data added sucessfully"
    })

    } catch (error) {
        console.log("error in /upload in castroute " + error);
        res.json("there is error in /details in castrouter"+error);
            
    }

})


castRouter.get("/details" , async(req:Request , res:Response)=>{
    try {
        const data = await CastModel.find({},{_id:0 , __v:0});
        res.json(data);
    } catch (error) {
         console.log("error in /details in castroute " + error);
        res.json("there is error in /details in castrouter"+error);
    }
})

export default castRouter;
