import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import theaterRoutes from "./routes/theater.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";

import { connectDB } from "./lib/db.js";
import { protectRoute } from "./middleware/auth.middleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/theater", protectRoute, theaterRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/schedule", protectRoute, scheduleRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    connectDB();
})