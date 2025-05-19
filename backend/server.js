import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import cors from "cors";
import cookieParser from 'cookie-parser';


dotenv.config();
connectDB();
const app = express();

app.use(cookieParser());


const allowedOrigins = [
  "http://localhost:5173",
  "https://event-feedback-system.onrender.com",
  "https://event-feedback-system.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/feedbacks", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
