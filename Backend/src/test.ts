import express from "express";
import movieModel from "./models/movieModel";
import cloudinary from "./libs/cloudinary";
import { config } from "dotenv";
import mongoose from "mongoose";

config();

//const Movierouter = express.Router();

const Movierouter = express();
Movierouter.use(express.json())

mongoose.connect(process.env.MONGOdb_URL || "")

Movierouter.post("/" ,async(req,res)=>{
    const {moviename , overview , poster_path ,backdrop_path , genres , release_date } = req.body;

    let poster_url ;
    let backdrop_url ;

    if(poster_path){
        const uploadResult = await cloudinary.uploader.upload(poster_path)
        poster_url = uploadResult.secure_url;
    }

    if(backdrop_path){
        const uploadResult = await cloudinary.uploader.upload(backdrop_path)
        backdrop_url = uploadResult.secure_url;
    }

    await movieModel.create({
        moviename:moviename,
        overview:overview,
        poster_path:poster_url,
        backdrop_path:backdrop_url,
        genres:genres,
        release_date:release_date
    })

    res.json({
        message:"Movie has been added sucessfully "

    })
})

Movierouter.listen(3000);

export default Movierouter;