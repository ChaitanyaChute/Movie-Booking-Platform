import { model, Schema } from "mongoose";

const CastSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    profile_pic:{
        type:String,
        required:true
    }
})

const CastModel = model("cast" ,CastSchema);
export default CastModel;