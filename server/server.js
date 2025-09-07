import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
          console.log(`Server is running on port: ${PORT}`);
});

console.log("Now we are gonna try to connect to MongoDB...");


const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
}).then(() => {
          console.log("Connected to MongoDB successfully✅");
}).catch((err) => {
          console.log("Error connecting to MongoDB❌", err);
});


// Register routes
app.use("/users", userRoutes);