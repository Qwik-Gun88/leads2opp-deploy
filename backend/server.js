import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import multer from "multer";
import mongoose from "mongoose";
import cron from "node-cron";
import * as dotenv from "dotenv";
import sendEmailRoute from "./routes/sendEmail.js";
import Contact from "./models/Contact.js";
import db from "./utils/firebase.js"; // Firestore init

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api", sendEmailRoute);

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, "../dist")));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ File upload middleware
const upload = multer({ dest: "uploads/" });

// ✅ Debug route to verify frontend build is served
app.get("/debug", (req, res) => {
  try {
    const distPath = path.join(__dirname, "../dist");
    const files = fs.readdirSync(distPath);
    res.json({ distContents: files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Fallback route: serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 leads2opp backend fully deployed on port ${PORT}`);
});
