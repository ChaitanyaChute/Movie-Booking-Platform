import express from "express";
import movieModel from "../models/movieModel";
import cloudinary from "../libs/cloudinary";


const Movierouter = express.Router();

Movierouter.post("/upload" ,async(req,res)=>{
    const {moviename , overview , poster_path ,backdrop_path , genres , release_date } = req.body;

    let poster_url ;
    let backdrop_url ;

    if(poster_path){
        const uploadResult = await cloudinary.uploader.upload(poster_path)
        poster_url = uploadResult.secure_url;
    }

    if(backdrop_path){
        const uploadResult = await cloudinary.uploader.upload(backdrop_path , {
            height: 200, 
            width: 200, 
            crop: "fill"
        })
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


Movierouter.get("/Poster", async (req, res) => {
    try {
        const backdrops = await movieModel.find({}, { backdrop_path: 1, _id: 0 });
        res.status(200).json(backdrops); 
    } catch (err) {
        console.error("Error fetching backdrops:", err);
        res.status(500).json({ error: "Failed to fetch backdrop paths" });
    }
});


Movierouter.get("/detail" ,async(req,res)=>{
    try {
        const data = await movieModel.find({},{moviename:1 ,_id:0 ,genres:1,release_date :1,backdrop_path:1});
        res.json(data)
    } catch (error) {
        res.json({
            message:"There is error " , 
            error 
        })
    }


})
export default Movierouter;