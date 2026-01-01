import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin:{
      type: Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const userModel = model("user" , userSchema);

export default userModel;