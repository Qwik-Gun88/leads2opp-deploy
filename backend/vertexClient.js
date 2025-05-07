import aiplatform from '@google-cloud/aiplatform';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pull out required classes from the SDK
const { PredictionServiceClient } = aiplatform.v1;

// Init client
const client = new PredictionServiceClient({
  keyFilename: path.join(__dirname, 'euphoric-grin-455920-k5-cc478f55fda7.json'),
});

// Model info
const project = 'euphoric-grin-455920-k5';
const location = 'us-central1';
const model = 'projects/euphoric-grin-455920-k5/locations/us-central1/publishers/google/models/gemini-1.0-pro';

// Helper to generate content
async function generateWithVertex(prompt) {
  const [response] = await client.predict({
    endpoint: `projects/${project}/locations/${location}/publishers/google/models/gemini-1.0-pro`,
    instances: [{ prompt }],
    parameters: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  });

  return response.predictions[0].content;
}
