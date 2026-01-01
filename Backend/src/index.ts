import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Userrouter from "./routes/userRoute";
import Movierouter from "./routes/MovieRoute";
import { dbconnect } from "./libs/Mongodb";
import cors from "cors";
import castRouter from "./routes/castRoute";
import adminRouter from "./routes/adminRouter";
import BookingRouter from "./routes/BookingRouter";

dotenv.config();

dbconnect();

const PORT = process.env.PORT || "3000";

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_PROD_URL,
];

const app = express();

// Stripe webhook needs raw body, so add it before express.json()
app.use("/bookings/webhook", express.raw({ type: "application/json" }), BookingRouter);

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
  console.log("Request Origin:", origin);

  if (!origin) return callback(null, true);

  if (allowedOrigins.indexOf(origin) === -1) {
    console.log(" Blocked by CORS:", origin);
    return callback(new Error("CORS policy does not allow this origin"), false);
  }

  console.log(" CORS Allowed:", origin);
  return callback(null, true);
},

  credentials: true,
}));




app.use("/users", Userrouter);
app.use("/movies", Movierouter);
app.use("/cast", castRouter);
app.use("/admin",adminRouter);
app.use("/bookings",BookingRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
