import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const serviceAccount = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../firebaseConfig.json'), 'utf-8')
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('✅ Firebase initialized');
} catch (err) {
  console.error('❌ Failed to load Firebase config or initialize:', err.message);
  process.exit(1); // exit to prevent Cloud Run from hanging
}

const db = admin.firestore();
export default db;
