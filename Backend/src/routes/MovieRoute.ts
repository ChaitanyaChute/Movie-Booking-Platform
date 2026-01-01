import express from "express";
import movieModel from "../models/moviemodel";
import cloudinary from "../libs/cloudinary";
import { adminM } from "../middleware/admin";


const Movierouter = express.Router();

Movierouter.post("/upload",adminM , async(req,res)=>{
    const {moviename , overview , poster_path ,backdrop_path , genres , release_date , original_language , duration} = req.body;

    try {
        let poster_url ;
    let backdrop_url ;

    if(poster_path){
        const uploadResult = await cloudinary.uploader.upload(poster_path ,{
            height:200,
            width:200,
            crop:"fill"
        })
        poster_url = uploadResult.secure_url;
    }

    if(backdrop_path){
        const uploadResult = await cloudinary.uploader.upload(backdrop_path , {
            height: 350, 
            width: 300, 
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
        release_date:release_date,
        duration:duration,
        original_language:original_language
    })

    res.json({
        message:"Movie has been added sucessfully "

    })
    } catch (error) {
        res.json({error:"there is error in /movies/upload:"} )
         console.error("There is error  in  /movies/Poster", error);
    }

    
})


Movierouter.get("/poster", async (req, res) => {
    try {
        const backdrops = await movieModel.find({}, { poster_path: 1, _id:1 ,duration:1,genres:1,release_date:1 });
        res.status(200).json(backdrops); 
    } catch (err) {
        console.error("There is error  in  /movies/Poster", err);
        res.status(500).json({ error: "Failed to fetch backdrop paths" });
    }
});


Movierouter.get("/detail" ,async(req,res)=>{
    try {
        const data = await movieModel.find({_id:1,release_date:1,backdrop_path:1 , overview:1 ,moviename:1 , original_language:1 , genres:1});
        res.json(data)
    } catch (error) {
        res.json({
            message:"There is error  in  /movies/detail" , 
            error 
        })
    }


})

Movierouter.get("/:id", async(req,res)=>{
    const movieId = req.params.id;

    const movie = await movieModel.findById(movieId);

    res.json(movie)
})
export default Movierouter;

// Delete a movie (show) by ID (admin only)
Movierouter.delete("/:id", adminM, async (req, res) => {
    try {
        const movieId = req.params.id;
        const deleted = await movieModel.findByIdAndDelete(movieId);
        if (!deleted) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).json({ error: "Failed to delete movie" });
    }
});

Movierouter.post