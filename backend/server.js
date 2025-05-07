// server.js

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
import { exec } from "child_process";
import util from "util";

dotenv.config();

const execPromise = util.promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express setup
const app = express();
app.use(cors());
app.use(express.json());

// Debug route
app.get("/debug", (req, res) => {
  try {
    const distPath = path.join(__dirname, "./dist");
    const files = fs.readdirSync(distPath);
    res.json({ distContents: files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vertex AI / Gemini config
const project = process.env.GCP_PROJECT_ID;
const location = "us-central1";
const modelId = "gemini-2.0-flash";
const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${modelId}:streamGenerateContent`;

// Function to obtain access token
async function getAccessToken() {
  try {
    const { stdout } = await execPromise("gcloud auth application-default print-access-token");
    return stdout.trim();
  } catch (err) {
    console.error("Error obtaining access token:", err.message);
    throw new Error("Failed to obtain access token.");
  }
}

// Call Gemini to generate content
// Call Gemini to generate content
async function generateWithGemini(prompt) {
  const accessToken = await getAccessToken();

  const payload = {
    contents: {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  };

  try {
    console.log("🔍 Sending payload to Gemini:", JSON.stringify(payload, null, 2));

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("🔍 Response Status:", resp.status);
    console.log("🔍 Response Headers:", JSON.stringify([...resp.headers]));

    const data = await resp.json();
    console.log("🔍 Full Gemini Response:", JSON.stringify(data, null, 2));

    if (!resp.ok) {
      console.error("❌ Gemini API Error:", data.error?.message || "Unknown Error");
      console.log("🔍 Error Details:", JSON.stringify(data, null, 2));
      throw new Error("Failed to generate content using Gemini.");
    }

    if (!Array.isArray(data) || data.length === 0) {
      console.error("❌ Invalid Gemini response structure. Expected a non-empty array.");
      throw new Error("No valid response received from Gemini.");
    }

    // Extract content from all response objects
    const content = data
      .flatMap(item => item.candidates) // Collect all candidate arrays
      .flatMap(candidate => candidate.content?.parts || []) // Collect all parts
      .map(part => part.text) // Extract text content
      .join(" "); // Combine into a single string

    console.log("✅ Generated Content:", content);

    return content;
  } catch (error) {
    console.error("❌ Vertex AI Error:", error.message);
    throw new Error("Failed to generate content using Gemini.");
  }
}

// Endpoint for generating email content
app.post("/api/generate-email", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const content = await generateWithGemini(prompt);
    res.json({ content });
  } catch (err) {
    console.error("❌ Generate Email Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

// Static files and fallback route
app.use(express.static(path.join(__dirname, "./dist")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
