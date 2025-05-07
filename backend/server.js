import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";
import mongoose from "mongoose";
import cron from "node-cron";
import * as dotenv from "dotenv";
import sendEmailRoute from "./routes/sendEmail.js";
import Contact from "./models/Contact.js";
import emailTemplatesRoute from './routes/emailTemplates.js';
import templatesRoute from './routes/templates.js';
import signatureRoutes from './routes/signatures.js';

// ✅ Vertex AI setup (PredictionServiceClient instead of VertexAI constructor)
import aiplatform from '@google-cloud/aiplatform';
const { PredictionServiceClient } = aiplatform.v1;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new PredictionServiceClient({
  keyFilename: path.join(__dirname, 'euphoric-grin-455920-k5-cc478f55fda7.json'),
});

const project = 'euphoric-grin-455920-k5';
const location = 'us-central1';
const model = `projects/${project}/locations/${location}/publishers/google/models/text-bison@001`; // fallback model

async function generateWithVertex(prompt) {
  const [response] = await client.predict({
    endpoint: `projects/${project}/locations/${location}/publishers/google/models/text-bison@001`,
    instances: [{ prompt }],
    parameters: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  });

  return response.predictions[0].content || "AI response missing.";
}


// ✅ App setup
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api", sendEmailRoute);
app.use('/api/templates', emailTemplatesRoute);
app.use('/api', templatesRoute);
app.use('/api/signatures', signatureRoutes);

// ✅ AI route
app.post('/api/generate-email', async (req, res) => {
  const { prompt } = req.body;

  try {
    const content = await generateWithVertex(prompt);
    res.json({ content });
  } catch (error) {
    console.error('Vertex AI Error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});
app.post('/api/generate-sequence', async (req, res) => {
  const { prompt } = req.body;

  try {
    // TEMP: Fake output — replace with Vertex AI later
    const sequence = [
      { id: '1', type: 'email', label: 'Email 1' },
      { id: '2', type: 'call', label: 'Call 1' },
      { id: '3', type: 'text', label: 'Text 1' },
    ];

    // Convert to node + edge format (React Flow style)
    const nodes = sequence.map((step, index) => ({
      id: step.id,
      type: 'default',
      data: { label: step.label, stepType: step.type },
      position: { x: 300, y: index * 180 },
    }));

    const edges = sequence.slice(1).map((step, index) => ({
      id: `e${sequence[index].id}-${step.id}`,
      source: sequence[index].id,
      target: step.id,
      type: 'smoothstep',
    }));

    res.json({ nodes, edges });
  } catch (err) {
    console.error('❌ Failed to generate sequence:', err);
    res.status(500).json({ error: 'Failed to generate sequence' });
  }
});


// ✅ Serve frontend
app.use(express.static(path.join(__dirname, './dist')));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ File upload
const upload = multer({ dest: "uploads/" });

// ✅ Debug route
app.get("/debug", (req, res) => {
  try {
    const distPath = path.join(__dirname, "../dist");
    const files = fs.readdirSync(distPath);
    res.json({ distContents: files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Fallback route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 leads2opp backend fully deployed on port ${PORT}`);
});
