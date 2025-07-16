import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Userrouter from "./controller/userController";
import Movierouter from "./controller/MovieController";
import { dbconnect } from "./libs/Mongodb";

dotenv.config();

dbconnect();

const PORT = process.env.PORT || "3000";

const app = express();
app.use(express.json());


// Route mounting
app.use("/users", Userrouter);
app.use("/movies", Movierouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
