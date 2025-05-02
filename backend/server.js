import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
<<<<<<< HEAD
import sendEmailRoute from "./routes/sendEmail.js";
=======
import mongoose from "mongoose";
import cron from "node-cron";
import * as dotenv from "dotenv";
import Contact from "./models/Contact.js";
import sendEmailRoute from './routes/sendEmail.js';

>>>>>>> rollback-to-stable

// ✅ Firebase Firestore is now used (import in relevant modules)
import db from "./utils/firebase.js"; // this ensures Firestore initializes

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use("/api", sendEmailRoute);
=======
app.use('/api', sendEmailRoute);

>>>>>>> rollback-to-stable

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, "../dist")));

<<<<<<< HEAD
=======
// ✅ MongoDB connection using .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ❌ Twilio temporarily disabled for stability
/*
let client = null;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
  console.log("✅ Twilio client initialized");
} else {
  console.warn("⚠️ Twilio credentials not found. Skipping Twilio client init.");
}
*/

// ✅ File upload middleware
const upload = multer({ dest: "uploads/" });

>>>>>>> rollback-to-stable
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

// ✅ Fallback route: serve React app for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 leads2opp backend fully deployed on port ${PORT}`);
});
