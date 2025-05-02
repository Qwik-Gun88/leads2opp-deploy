import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import sendEmailRoute from "./routes/sendEmail.js";

// ✅ Firebase Firestore is now used (import in relevant modules)
import db from "./utils/firebase.js"; // this ensures Firestore initializes

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", sendEmailRoute);

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, "../dist")));

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
