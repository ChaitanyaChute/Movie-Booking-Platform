import { model, Schema } from "mongoose";

const movieSchema = new Schema({
    moviename:{
        type:String,
        required:true,
    },
    overview:{
        type:String,
        required:true
    },
    poster_path:{
        type:String,
        required:true
    },
    backdrop_path:{
        type:String,
        required:true
    },
    genres:{
        type:[],
    },
    release_date:{
        type:Date,
        required:true 

    } ,
    original_language:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    tagline:{type:String},
    vote_average:{type:Number},
    vote_count:{type:Number},
    
})

const movieModel = model("movies",movieSchema);

export default movieModel;
    
