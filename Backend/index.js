import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import userRoutes from "./Routes/AuthRouter.js";
import documentRoutes from "./Routes/documentRoute.js";
import lawyerRoutes from "./Routes/lawyerProfileRoutes.js";
import clientProfileRoutes from "./Routes/clientProfileRoutes.js";
import requestRoutes from "./Routes/Requests.js";
dotenv.config();
connectDB();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/uploads", express.static("uploads"));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/client-profile", clientProfileRoutes);
app.use("/api/requests", requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
