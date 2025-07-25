import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Userrouter from "./routes/userRoute";
import Movierouter from "./routes/MovieRoute";
import { dbconnect } from "./libs/Mongodb";
import cors from "cors";
import castRouter from "./routes/castRoute";

dotenv.config();

dbconnect();

const PORT = process.env.PORT || "3000";

const app = express();
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))



app.use("/users", Userrouter);
app.use("/movies", Movierouter);
app.use("/cast", castRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
