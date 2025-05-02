import admin from 'firebase-admin';
import fs from 'fs';

try {
  const configPath = '/secrets/FIREBASE_CONFIG';
  console.log(`🔐 Loading Firebase config from: ${configPath}`);

  const serviceAccount = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('✅ Firebase initialized');
} catch (err) {
  console.error('❌ Failed to load Firebase config or initialize:', err.message);
  process.exit(1); // Important: exit to prevent Cloud Run hanging
}

const db = admin.firestore();
export default db;
